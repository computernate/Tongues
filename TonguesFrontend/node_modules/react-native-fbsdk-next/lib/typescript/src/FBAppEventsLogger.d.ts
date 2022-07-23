/**
 * Controls when an AppEventsLogger sends log events to the server
 */
export declare type AppEventsFlushBehavior = 
/**
 * Flush automatically: periodically (every 15 seconds or after every 100 events), and
 * always at app reactivation. This is the default value.
 */
'auto'
/**
 * Only flush when AppEventsLogger.flush() is explicitly invoked.
 */
 | 'explicit_only';
/**
 * Specifies product availability for Product Catalog product item update
 */
export declare type ProductAvailability = 
/**
 * Item ships immediately
 */
'in_stock'
/**
 * No plan to restock
 */
 | 'out_of_stock'
/**
 * Available in future
 */
 | 'preorder'
/**
 * Ships in 1-2 weeks
 */
 | 'avaliable_for_order'
/**
 * Discontinued
 */
 | 'discontinued';
/**
 * Specifies product condition for Product Catalog product item update
 */
export declare type ProductCondition = 'new' | 'refurbished' | 'used';
export declare type Params = {
    [key: string]: string | number;
};
/**
 * Info about a user to increase chances of matching a Facebook user.
 * See https://developers.facebook.com/docs/app-events/advanced-matching for
 * more info about the expected format of each field.
 */
export declare type UserData = Readonly<{
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: 'm' | 'f';
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
}>;
export declare type AppEvent = {
    AchievedLevel: string;
    AdClick: string;
    AdImpression: string;
    AddedPaymentInfo: string;
    AddedToCart: string;
    AddedToWishlist: string;
    CompletedRegistration: string;
    CompletedTutorial: string;
    Contact: string;
    CustomizeProduct: string;
    Donate: string;
    FindLocation: string;
    InitiatedCheckout: string;
    Purchased: string;
    Rated: string;
    Searched: string;
    SpentCredits: string;
    Schedule: string;
    StartTrial: string;
    SubmitApplication: string;
    Subscribe: string;
    UnlockedAchievement: string;
    ViewedContent: string;
};
export declare type AppEventParam = {
    AddType: string;
    Content: string;
    ContentID: string;
    ContentType: string;
    Currency: string;
    Description: string;
    Level: string;
    NumItems: string;
    MaxRatingValue: string;
    OrderId: string;
    PaymentInfoAvailable: string;
    RegistrationMethod: string;
    SearchString: string;
    Success: string;
    ValueNo: string;
    ValueYes: string;
};
declare const _default: {
    /**
     * Sets the current event flushing behavior specifying when events
     * are sent back to Facebook servers.
     */
    setFlushBehavior(flushBehavior: AppEventsFlushBehavior): void;
    /**
     * Logs an event with eventName and optional arguments.
     * This function supports the following usage:
     * logEvent(eventName: string);
     * logEvent(eventName: string, valueToSum: number);
     * logEvent(eventName: string, parameters: {[key:string]:string|number});
     * logEvent(eventName: string, valueToSum: number, parameters: {[key:string]:string|number});
     * See https://developers.facebook.com/docs/app-events/android for detail.
     */
    logEvent(eventName: string, ...args: Array<number | Params>): void;
    /**
     * Logs a purchase. See http://en.wikipedia.org/wiki/ISO_4217 for currencyCode.
     */
    logPurchase(purchaseAmount: number, currencyCode: string, parameters?: Params): void;
    /**
     * Logs an app event that tracks that the application was open via Push Notification.
     */
    logPushNotificationOpen(payload?: Record<string, string | number>): void;
    /**
     * Uploads product catalog product item as an app event
     * @param itemID – Unique ID for the item. Can be a variant for a product. Max size is 100.
     * @param availability – If item is in stock. Accepted values are: in stock - Item ships immediately out of stock - No plan to restock preorder - Available in future available for order - Ships in 1-2 weeks discontinued - Discontinued
     * @param condition – Product condition: new, refurbished or used.
     * @param description – Short text describing product. Max size is 5000.
     * @param imageLink – Link to item image used in ad.
     * @param link – Link to merchant's site where someone can buy the item.
     * @param title – Title of item.
     * @param priceAmount – Amount of purchase, in the currency specified by the 'currency' parameter. This value will be rounded to the thousandths place (e.g., 12.34567 becomes 12.346).
     * @param currency – Currency used to specify the amount.
     * @param gtin – Global Trade Item Number including UPC, EAN, JAN and ISBN
     * @param mpn – Unique manufacture ID for product
     * @param brand – Name of the brand Note: Either gtin, mpn or brand is required.
     * @param parameters – Optional fields for deep link specification.
     */
    logProductItem(itemID: string, availability: ProductAvailability, condition: ProductCondition, description: string, imageLink: string, link: string, title: string, priceAmount: number, currency: string, gtin?: string, mpn?: string, brand?: string, parameters?: Params): void;
    /**
     * Explicitly kicks off flushing of events to Facebook.
     */
    flush(): void;
    /**
     * Sets a custom user ID to associate with all app events.
     * The userID is persisted until this method is called again with a null userId
     */
    setUserID(userID: string | null): void;
    /**
     * Clears the currently set user id.
     * @deprecated use setUserID(null) instead
     */
    clearUserID(): void;
    /**
     * Returns user id or null if not set
     */
    getUserID(): Promise<string | null>;
    /**
     * Returns anonymous id or null if not set
     */
    getAnonymousID(): Promise<string | null>;
    /**
     * Returns advertiser id or null if not set
     */
    getAdvertiserID(): Promise<string | null>;
    /**
     * Returns advertiser id or null if not set.
     * @platform android
     */
    getAttributionID(): Promise<string | null>;
    /**
     * Set additional data about the user to increase chances of matching a Facebook user.
     */
    setUserData(userData: UserData): void;
    /**
     * For iOS only, sets and sends device token to register the current application for push notifications.
     * @platform ios
     */
    setPushNotificationsDeviceToken(deviceToken: string): void;
    /**
     * For Android only, sets and sends registration id to register the current app for push notifications.
     * @platform Android
     */
    setPushNotificationsRegistrationId(registrationId: string): void;
    /**
     * Predefined event names for logging events common to many apps.
     */
    AppEvents: any;
    /**
     *  Predefined event name parameters for common additional information to accompany events logged through the `logEvent`.
     */
    AppEventParams: any;
};
export default _default;
