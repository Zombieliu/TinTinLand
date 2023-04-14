import {HttpClient} from "tsrpc-browser";

import {serviceProto} from "../shared/protocols/serviceProto";
import {notion_serviceProto} from "../notion_shared/protocols/serviceProto";

const client = new HttpClient(serviceProto, {
    // server: 'https://api.tintinland.com',
    server: " http://localhost:3001",
    json: true,
    // logger: console
});

const notion_client = new HttpClient(notion_serviceProto, {
    // server: 'https://api.tintinland.com',
    server: " http://localhost:3001",
    json: true,
    // logger: console
});


export {
    client,
    notion_client
}
