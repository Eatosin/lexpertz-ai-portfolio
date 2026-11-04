type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Renders schema.org JSON-LD. All inputs are built from local constants and
 * content files (never user input), and `<` is escaped so a future string
 * containing a tag cannot break out of the script element.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
