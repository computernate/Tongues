export declare type ProfileMap = {
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    imageURL?: string | null;
    linkURL?: string | null;
    userID?: string | null;
    email?: string | null;
    name?: string | null;
};
/**
 * Represents an immutable Facebook profile
 * This class provides a global "currentProfile" instance to more easily add social context to your application.
 */
declare class FBProfile {
    /**
     * The user id
     */
    userID?: string | null;
    /**
     * The user's email.
     * IMPORTANT: This field will only be populated if your user has granted your application the 'email' permission.
     */
    email?: string | null;
    /**
     * The user's complete name
     */
    name?: string | null;
    /**
     * The user's first name
     */
    firstName?: string | null;
    /**
     * The user's last name
     */
    lastName?: string | null;
    /**
     * The user's middle name
     */
    middleName?: string | null;
    /**
     * A URL to the user's profile.
     * IMPORTANT: This field will only be populated if your user has granted your application the 'user_link' permission
     */
    linkURL?: string | null;
    /**
     * A URL to use for fetching a user's profile image.
     */
    imageURL?: string | null;
    constructor(profileMap: ProfileMap);
    /**
     * Getter the current logged profile
     */
    static getCurrentProfile(): Promise<FBProfile | null>;
}
export default FBProfile;
