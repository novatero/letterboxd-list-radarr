import { LetterboxdPoster } from "./list";
import { getKanpai, LETTERBOXD_ORIGIN } from "./util";

export const getCollection = async (
    collectionSlug: string
): Promise<LetterboxdPoster[]> => {
    // The letterboxd url-scheme can be pretty complex for collections,
    // and i'm too lazy to extract the collection-name from the collectionSlug.
    // Therefore we fetch the ajaxUrl from the given page itself.
    const ajaxUrl = await getKanpai<string>(
        `${LETTERBOXD_ORIGIN}${collectionSlug}`,
        ["#films-browser-list-container", "[data-url]"]
    );

    const posters = await getKanpai<LetterboxdPoster[]>(
        `${LETTERBOXD_ORIGIN}${ajaxUrl}`,
        [
            '[data-component-class="globals.comps.LazyPoster"]',
            {
                slug: ["$", "[data-item-link]"],
                title: ["$", "[data-item-full-display-name]", "[data-item-name]", "[alt]"],
            },
        ]
    );

    return posters;
};
