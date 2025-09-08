import * as cheerio from "cheerio";

export const getTablesData = async (): Promise<
  Record<string, { name: string; image: string | null; url: string }[]>
> => {
  const url = process.env.TABLES_URL || "";
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const groups = [
    "Principais competições 2025",
    "Campeonatos internacionais 2025/2026"
  ];

  const results: Record<
    string,
    { name: string; image: string | null; url: string }[]
  > = {};

  $("div.section__grupos").each((_, grupo) => {
    const groupTitle = $(grupo).find("h1,h2,h3,h4,h5,h6").first().text().trim();
    if (!groupTitle || !groups.includes(groupTitle)) return;

    const championships: { name: string; image: string | null; url: string }[] =
      [];
    $(grupo)
      .find("li")
      .each((_, li) => {
        const name = $(li).find("h2,h3,h4").first().text().trim() || null;
        const image = $(li).find("img").attr("src") || null;
        const url = $(li).find("a").attr("href") || null;

        if (name && url) {
          championships.push({ name, image, url });
        }
      });

    results[groupTitle] = championships;
  });
  return results;
};
