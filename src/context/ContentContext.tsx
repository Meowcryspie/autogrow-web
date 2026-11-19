import React, { createContext, useContext, useState } from 'react';
import type { 
  SiteContentData, 
  HeroSlideItem, 
  ShowcaseSectionItem, 
  StoreProduct, 
  BlogPost, 
  DistributorLocation, 
  SupportContacts 
} from '../types';
import { DEFAULT_SITE_CONTENT } from '../data/initialContent';

const STORAGE_KEY = 'autogrow_cms_content_v3';

interface ContentContextType {
  // Published / Saved content
  content: SiteContentData;
  // Working draft inside admin
  draftContent: SiteContentData;
  isDraftModified: boolean;
  // Preview mode toggle
  isPreviewMode: boolean;
  setPreviewMode: (preview: boolean) => void;
  // Effective content to render (draft if in preview, else published)
  activeContent: SiteContentData;
  
  // Draft mutators
  updateHeroSlides: (slides: HeroSlideItem[]) => void;
  updateShowcaseSections: (sections: ShowcaseSectionItem[]) => void;
  updateStoreProducts: (products: StoreProduct[]) => void;
  updateBlogPosts: (posts: BlogPost[]) => void;
  updateDistributors: (distributors: DistributorLocation[]) => void;
  updateSupportContacts: (contacts: SupportContacts) => void;
  
  // Actions
  publishDraft: () => void;
  discardDraft: () => void;
  resetToDefaults: () => void;
  exportJson: () => void;
  importJson: (jsonString: string) => boolean;
}

const ContentContext = createContext<ContentContextType | null>(null);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContentData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.heroSlides && parsed.heroSlides[0]?.id === 'autogrow-banner') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse saved CMS content from localStorage:', e);
    }
    return DEFAULT_SITE_CONTENT;
  });

  const [draftContent, setDraftContent] = useState<SiteContentData>(content);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);

  // Check if draft differs from published
  const isDraftModified = JSON.stringify(content) !== JSON.stringify(draftContent);

  // Effective content: during preview mode, render the working draft
  const activeContent = isPreviewMode ? draftContent : content;

  // Mutator helpers
  const updateHeroSlides = (slides: HeroSlideItem[]) => {
    setDraftContent(prev => ({ ...prev, heroSlides: slides }));
  };

  const updateShowcaseSections = (sections: ShowcaseSectionItem[]) => {
    setDraftContent(prev => ({ ...prev, showcaseSections: sections }));
  };

  const updateStoreProducts = (products: StoreProduct[]) => {
    setDraftContent(prev => ({ ...prev, storeProducts: products }));
  };

  const updateBlogPosts = (posts: BlogPost[]) => {
    setDraftContent(prev => ({ ...prev, blogPosts: posts }));
  };

  const updateDistributors = (distributors: DistributorLocation[]) => {
    setDraftContent(prev => ({ ...prev, distributors }));
  };

  const updateSupportContacts = (contacts: SupportContacts) => {
    setDraftContent(prev => ({ ...prev, supportContacts: contacts }));
  };

  // Publish: save draft to content and localStorage
  const publishDraft = () => {
    const updated = {
      ...draftContent,
      lastUpdated: new Date().toISOString(),
    };
    setContent(updated);
    setDraftContent(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save content to localStorage:', e);
    }
  };

  // Discard draft: revert draft to current published
  const discardDraft = () => {
    setDraftContent(content);
  };

  // Reset to factory defaults
  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(DEFAULT_SITE_CONTENT);
    setDraftContent(DEFAULT_SITE_CONTENT);
  };

  // Export JSON file for database-free persistence / static builds
  const exportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(draftContent, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `autogrow-cms-content-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON configuration
  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.heroSlides && parsed.storeProducts && parsed.blogPosts) {
        setDraftContent(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON structure:', e);
    }
    return false;
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        draftContent,
        isDraftModified,
        isPreviewMode,
        setPreviewMode: setIsPreviewMode,
        activeContent,
        updateHeroSlides,
        updateShowcaseSections,
        updateStoreProducts,
        updateBlogPosts,
        updateDistributors,
        updateSupportContacts,
        publishDraft,
        discardDraft,
        resetToDefaults,
        exportJson,
        importJson,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
