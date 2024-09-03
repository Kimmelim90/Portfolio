export async function postjson(event, form){
    event.preventDefault();
    const formData = new FormData(form);

    const title = formData.get("title");
    const shortDescription = formData.get("shortDescription");
    const date = formData.get("date");
    const description = formData.get("description");
    const [year, month, day] = date.split("-");
    await fetch("http://localhost:3999/postjson", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        [title]: {
            "id": Date.now(),
            "short description": shortDescription,
            "date": {
                "day": day,
                "month": month,
                "year": year
            },
            "description": description
        }
    })
    });
    window.location.replace("/");
}