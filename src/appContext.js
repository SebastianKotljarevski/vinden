import React from "react";

export default React.createContext({
    storageItems: [],
    getStateItemById: () => {},
    doIncrement: () => {},
    doDecrement: () => {}
});
