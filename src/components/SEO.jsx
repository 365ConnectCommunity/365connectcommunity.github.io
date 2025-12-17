import { useEffect } from 'react';

const SEO = ({ title, description, image, url, keywords }) => {
    useEffect(() => {
        // Update Title
        document.title = title ? `${title} | 365Connect Community` : '365Connect Community';

        // Update Meta Tags
        const setMetaTag = (name, content) => {
            if (!content) return;
            let element = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                if (name.startsWith('og:') || name.startsWith('twitter:')) {
                    element.setAttribute('property', name);
                } else {
                    element.setAttribute('name', name);
                }
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        setMetaTag('description', description);
        setMetaTag('keywords', Array.isArray(keywords) ? keywords.join(', ') : keywords);
        setMetaTag('og:title', title);
        setMetaTag('og:description', description);
        setMetaTag('og:image', image || '/logo.png'); // Default to logo
        setMetaTag('og:url', url || window.location.href);
        setMetaTag('twitter:card', 'summary_large_image');

        // Update Canonical Link
        let linkRel = document.querySelector(`link[rel="canonical"]`);
        if (!linkRel) {
            linkRel = document.createElement('link');
            linkRel.setAttribute('rel', 'canonical');
            document.head.appendChild(linkRel);
        }
        linkRel.setAttribute('href', url || window.location.href);

    }, [title, description, image, url, keywords]);

    return null;
};

export default SEO;
