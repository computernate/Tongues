/// <reference types="react" />
export declare type PropsOf<T> = T extends React.Component<infer P> ? P : never;
