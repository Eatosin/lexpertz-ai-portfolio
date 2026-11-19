# Thumbnail and social-cover system

Rules for the 1200x630 images used as insight covers, Open Graph cards, and
feed thumbnails. The goal is not decoration. It is a cover that earns the click
without over-promising the article.

This system was introduced in November 2026 after an audit of the existing
covers found seven variations of the same dark template: a two-line statement, a
small abstract diagram, and a brand line. The covers were consistent and
unmemorable. At feed size, none of them gave a viewer a reason to stop.

## What the evidence supports

| Pattern | Evidence | Confidence | Rule |
|---|---|---|---|
| Designed OG image beats a cropped hero | Google Discover case study: large-image previews +79% CTR (food blog); +30% CTR and +332% clicks in six months (news) | High | Always ship a purpose-built 1200x630 image, not a screenshot or a cropped page hero. |
| Faces are not a shortcut | 300k-video analysis: faces showed no overall CTR difference; the business niche performed worse with faces | High | Do not force a founder headshot onto a technical post. The artefact is the face. |
| Short text wins | Median overlay length among 500 thumbnails: 5 words; 3-5 recommended; unreadable past 6 | Medium | 3-5 words, two lines maximum, roughly 28 characters. |
| Contrast and one focal point | 56% of high performers used high-contrast colour; 89% used a face or contrast; winners used one subject and at most 1-2 arrows | Medium | One artefact at 40-60% of the frame. Contrast is table stakes, not a differentiator. |
| Curiosity gap | Meta-analysis of 8,977 headline experiments: concreteness helps when peers are vague and can hurt when peers are already concrete | High | Name the constraint ("audit"), withhold the resolution ("the 7"). |
| Real artefacts beat AI art | Consumers prefer real over AI-generated imagery for high-involvement services | Medium | Use a document, table, redline, or UI crop. No neural glow, robot hands, or generic AI art. |
| Test at feed size | Platform previews render far smaller than the source file; critical text must survive a 25% reduction | High | Shrink the cover to ~300px wide before shipping. If the words mush, cut words, not size. |
| Misleading covers backfire | YouTube policy bars thumbnails that promise what the content does not deliver | High (policy) | Never mock up an audit result, dashboard, or endorsement the article cannot support. |

Sources are listed at the bottom. Treat the percentages as directional: most
public thumbnail data is correlational, not causal.

## The template

Canvas: **1200x630** PNG. Keep critical text and the brand inside a centred
**1000x524** safe zone for LinkedIn and X crops. Avoid the lower-right corner
where platform UI can sit.

Anatomy, in reading order:

1. **Eyebrow** (Geist Mono, 13-14px, tracked, muted): the series and topic.
2. **Hook** (Space Grotesk, 78-330px, tight): 3-5 words. Put the number in the
   visual, not in a sentence.
3. **Artefact** (40-60% of the frame): a document, table, redline, scorecard, or
   real UI crop. One object. No collage.
4. **One accent**: brand cyan, plus a semantic success green or audit red only
   where the meaning requires it.
5. **Brand line** (small, fixed corner): `lexpertz.ai` and the year.

Avoid: more than five words, repeating the H1 verbatim, a face on a technical
post, stock handshakes, abstract AI art, badge walls, and the same template with
only the text swapped.

## Applying it

The first cover in the new system is
[`enterprise-ai-benefits.png`](../../public/insights/enterprise-ai-benefits.png):
a warm paper audit sheet with ten benefit rows, seven checked and three struck
out, a large `7`, and the hook **"7 SURVIVE THE AUDIT"**. It is deliberately
light against a dark feed, reads at 300px, and looks like a document rather than
an ad.

A dark **"Big 7"** variant lives at
[`enterprise-ai-benefits-alt.png`](../../public/insights/enterprise-ai-benefits-alt.png)
for a social A/B test against the document cover. Ship one as the site cover;
keep the other for paid or organic tests.

## Test and rotation

- **Two variants per feature post.** One artefact-led, one number-led. Judge on
  platform-reported CTR *and* on-page engagement; high clicks with fast
  drop-off means the cover over-promised.
- **Rotate concepts.** Use a different visual family every few posts: audit
  document, redline, scorecard, portrait crop, real UI. The isolation effect
  only works if the next cover does not look like the last one.
- **Measure at 300px.** If the hook is unreadable at that width, it is not a
  thumbnail; it is a poster.
- **Do not retrofit silently.** If an old cover is replaced, keep the old asset
  until the new one has been live for a full measurement window.

## Sources

- [Google Discover large-image case study](https://developers.google.com/search/case-studies/large-images-case-study)
- [Search Engine Journal: do faces help YouTube thumbnails?](https://www.searchenginejournal.com/do-faces-help-youtube-thumbnails-heres-what-the-data-says/563944/)
- [vidIQ: YouTube thumbnail design data](https://vidiq.com/blog/post/youtube-thumbnail-design-tips/)
- [Scientific Reports: curiosity-gap headline meta-analysis](https://www.nature.com/articles/s41598-024-81575-9)
- [International Journal of Information Management: real vs AI imagery](https://www.sciencedirect.com/science/article/pii/S0268401225000866)
- [YouTube misleading-metadata policy](https://support.google.com/youtube/answer/2801973)
- [LinkedIn link-preview dimensions](https://www.linkedin.com/help/linkedin/answer/a564399)
