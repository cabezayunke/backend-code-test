import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import lusca from "lusca";

// Controllers (route handlers)
import * as healthController from "./controllers/health";
import MongoGeniallyRepository from "../contexts/core/genially/infrastructure/MongoGeniallyRepository";
import InMemorySyncDomainEventPublisher from "../contexts/shared/infrastructure/ImMemorySyncDomainEventPublisher";
import InMemorySyncDomainEventBus from "../contexts/shared/infrastructure/InMemorySyncDomainEventBus";
import {createGeniallyController} from "./controllers/createGeniallyController";
import {deleteGeniallyController} from "./controllers/deleteGeniallyController";
import {renameGeniallyController} from "./controllers/renameGeniallyController";
import AnalyticsOnGeniallyCreatedSubscriber from "./subscribers/AnalyticsOnGeniallyCreatedSubscriber";
import GeniallyCreated from "../contexts/core/genially/domain/events/GeniallyCreated";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

// Primary app routes
app.get("/", healthController.check);

// TODO:
// implement something to handle dependencies creation better
// either our own or with a DI container or similar

const statsRepository = new MongoGeniallyRepository();
const analyticsOnCreatedEventSubscriber = new AnalyticsOnGeniallyCreatedSubscriber(statsRepository);

const eventBus = new InMemorySyncDomainEventBus();
eventBus.subscribe(analyticsOnCreatedEventSubscriber, new GeniallyCreated());

const publisher = new InMemorySyncDomainEventPublisher(eventBus);
const geniallyRepository = new MongoGeniallyRepository();

app.post("/genially", createGeniallyController(geniallyRepository, publisher));
app.delete("/genially", deleteGeniallyController(geniallyRepository));
app.patch("/genially", renameGeniallyController(geniallyRepository));

export default app;
