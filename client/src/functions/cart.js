const API_URL = "http://localhost:8080";

export const checkout = async () => {

    const url = new URL(
        '/shop/checkout', API_URL
    );

    return await fetch(url.href,
        {
            method: "POST"
        });

}