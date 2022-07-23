/**
 * Aggregated Event Measurement (AEM) for iOS apps allows for the measurement of app events
 * from iOS 14.5+ users who have opted out of app tracking.
 *
 * @ref https://developers.facebook.com/docs/app-events/guides/aggregated-event-measurement/
 */
declare const _default: {
    /**
     * Log AEM event, event names for AEM must match event names you used in app event logging.
     *
     * *This method will bypass if platform isn't iOS*
     *
     * **Make sure you also handle the DeepLink URL with AEM**
     *
     * @ref https://developers.facebook.com/docs/app-events/guides/aggregated-event-measurement/
     * @platform iOS
     */
    logAEMEvent: (eventName: string, value: number, currency?: string, otherParameters?: Record<string, string | number>) => void;
};
export default _default;
