import "./index.css";
declare const EmptyStateComponent: ({ children, isConfigured, invalidConfig }: {
    children: any;
    isConfigured?: boolean | undefined;
    invalidConfig: any;
}) => JSX.Element;
export default EmptyStateComponent;
