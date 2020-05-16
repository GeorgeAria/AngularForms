// This interface is used to hold the choices/values in the user-settings-form.html page.

export interface UserSettings
{
    name: string;
    emailOffers: boolean;
    interfaceStyle: string;
    subscriptionType: string;
    notes: string;
}