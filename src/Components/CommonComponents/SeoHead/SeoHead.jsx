import { useEffect } from "react";
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  getOrganizationSchema,
  getWebSiteSchema,
  absoluteUrl,
} from "../../../config/site";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let element = document.head.querySelector(`script[data-seo-jsonld="${id}"]`);

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.setAttribute("data-seo-jsonld", id);
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

const SeoHead = ({
  title,
  description,
  path = "/",
  keywords,
  noindex = false,
  includeStructuredData = false,
}) => {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(path);
    const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE);
    const robotsContent = noindex ? "noindex, nofollow" : "index, follow";

    document.title = title;

    upsertLink("canonical", canonicalUrl);

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: robotsContent,
    });

    if (keywords) {
      upsertMeta('meta[name="keywords"]', {
        name: "keywords",
        content: keywords,
      });
    }

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE_NAME,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });
    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: "en_IN",
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });

    if (includeStructuredData) {
      upsertJsonLd("organization", getOrganizationSchema());
      upsertJsonLd("website", getWebSiteSchema());
    }
  }, [title, description, path, keywords, noindex, includeStructuredData]);

  return null;
};

export default SeoHead;
