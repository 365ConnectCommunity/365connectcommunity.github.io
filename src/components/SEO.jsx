import { useEffect } from 'react';

const SEO = ({ title, description, image, url }) => {
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
        setMetaTag('og:title', title);
        setMetaTag('og:description', description);
        setMetaTag('og:image', image || '/logo.png'); // Default to logo
        setMetaTag('og:url', url || window.location.href);
        setMetaTag('twitter:card', 'summary_large_image');

    }, [title, description, image, url]);

    return null;
};

export default SEO;
