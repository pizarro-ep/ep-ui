export type Delay = number;
export type Text = string;

interface Tooltip {
    text: Text,
    delay: Delay,
}

export const DefaultTooltip: Readonly<Tooltip> = {
    text: '',
    delay: 500,
}