import { GLOBAL_ROTATE, GLOBAL_ROTATE_X, GLOBAL_ROTATE_Y, GLOBAL_ROTATE_Z } from "@ep/global";
import { IAngle } from "./config";

export function getAngle(angle: IAngle): string[] {
    const rotateMap = {
        none: GLOBAL_ROTATE,
        x: GLOBAL_ROTATE_X,
        y: GLOBAL_ROTATE_Y,
        z: GLOBAL_ROTATE_Z,
    } as const;

    return Object.entries(angle)
        .map(([key, value]) => {
            if (!value) return "";
            const coordinate: keyof typeof rotateMap = key === "base"
                ? "none" : (key.toLowerCase() as keyof typeof rotateMap);
            return rotateMap[coordinate][value as keyof typeof rotateMap[typeof coordinate]];
        })
        .filter(Boolean);
}
