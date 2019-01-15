export default {
    validate (data) {
        let isNameValid = typeof data.name == "string" && data.name.length > 0;
        let existsItemsArray = Array.isArray(data.items);
        let test = (isNameValid && existsItemsArray);
        if (!test) {
            return false;
        }
        for (let i = 0; i < data.items.length; i++) {
            let test = (typeof data.items[i].listItemText == "string" && typeof data.items[i].key == "string");
            if (!test) {
                return false
            }
        }
        console.log("validated: ");
        console.log(data);
        return true;
    },
    Checklist (data) {
        this.name = data.name;

    }
}