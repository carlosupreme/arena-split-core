export interface IEquatable {
    equals(other: IEquatable): boolean;
    getEqualityComponents(): unknown[];
}
