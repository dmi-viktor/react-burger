export type TIngredient = {
    readonly calories: number;
    readonly carbohydrates: number;
    readonly fat: number;
    readonly proteins: number;
    readonly image: string;
    readonly image_large: string;
    readonly image_mobile: string;
    readonly name: string;
    readonly price: number;
    readonly type: string;
    readonly __v: number;
    readonly _id: string;
    readonly uuid?: string | null;
};

export type TLocataionState = {
    readonly background: Location;
};