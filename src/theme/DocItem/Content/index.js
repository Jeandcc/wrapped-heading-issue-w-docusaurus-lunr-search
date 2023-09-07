import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";
import Heading from "@theme/Heading";
import MDXContent from "@theme/MDXContent";
import { slugify } from "@site/src/util/string";
/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === "undefined";
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}
export default function DocItemContent({ children }) {
  const { frontMatter } = useDoc();
  const syntheticTitle = useSyntheticTitle();

  const headingFromFM = frontMatter?.heading || "";
  const descriptionFromFM = frontMatter?.description || "";
  const wrappedHeadingFromFM = frontMatter?.wrappedHeading || "";
  const wrappedGrandChildHeadingFromFM =
    frontMatter?.wrappedGrandChildHeading || "";
  const wrappedIndentedHeadingFromFM =
    frontMatter?.wrappedIndentedHeading || "";
  const wrappedDescriptionFromFM = frontMatter?.wrappedDescription || "";

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, "markdown")}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      {/* github repo test */}
      <MDXContent>
        {headingFromFM && (
          <h2 className="anchor" id={slugify(headingFromFM)}>
            {headingFromFM}
          </h2>
        )}
        {descriptionFromFM && <p>{descriptionFromFM}</p>}

        <div data-search-children>
          {wrappedHeadingFromFM && (
            <h2 className="anchor" id={slugify(wrappedHeadingFromFM)}>
              {wrappedHeadingFromFM}
            </h2>
          )}
          {wrappedDescriptionFromFM && <p>{wrappedDescriptionFromFM}</p>}
          <div>
            {wrappedGrandChildHeadingFromFM && (
              <h2
                className="anchor"
                id={slugify(wrappedGrandChildHeadingFromFM)}
              >
                {wrappedGrandChildHeadingFromFM}
              </h2>
            )}
            <div>
              <div>
                <div>
                  <div>
                    {wrappedIndentedHeadingFromFM && <h2 className="anchor" id={slugify(wrappedIndentedHeadingFromFM)}>{wrappedIndentedHeadingFromFM}</h2>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {children}
      </MDXContent>
    </div>
  );
}
