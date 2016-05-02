import EventEmitter from 'events';
import Logger from '../../Logger';

export default class Store {
    /**
     * A Flux-like Store Interface
     *
     * @constructor
     * @this {Store}
     * @param {string} name The name of the store
     */
    constructor(name) {
        this.storeName = name;
        this.components = {};
        this.state = {};
        this.eventEmitter = new EventEmitter();
        this.logger = new Logger(this.storeName);

        this.eventEmitter.on('STORE_CHANGED', this.onStoreChange.bind(this));
    }

    /**
     * Read-only Property for the name of the store
     */
    get name() {
        return this.storeName;
    }

    /**
     * Dummy onAction() method to catch failures in sub-classing the
     * Store appropriately.
     */
    onAction() {
        this.logger.error('Invalid Store - Must define onAction method');
    }

    /**
     * A component needs to listen itself with the store to receive
     * notifications of updates to the store
     *
     * @param {function} callback the method to call back
     * @returns {string} an ID to be used when unlistening
     */
    listen(callback) {
        let id = `${this.storeName}-${this.guid}`;
        this.logger.debug(`Listening new Component Callback and returning ID ${id}`);
        this.components[id] = callback;
        return id;
    }

    /**
     * A component also needs to unlisten itself with the store to
     * stop receiving notifications of updates to the store.
     *
     * @param {string} id the ID from the call to listen()
     * @param {boolean} force don't throw an error if it doesn't exist
     */
    unlisten(id, force = false) {
        this.logger.debug(`unlisten(${id}, ${force})`);
        if (id in this.components) {
            this.logger.debug(`Unlistening Components Callback with ID ${id}`);
            delete this.components[id];
        } else {
            if (!force) {
                throw 'Invalid Component Callback ID';
            }
        }
    }

    /**
     * Emit a change store event on the private Event Bus
     */
    changeStore() {
        this.logger.debug('Emitting Store Change Event');
        this.eventEmitter.emit('STORE_CHANGED');
    }

    /**
     * Pass on change store events to the listened components
     */
    onStoreChange() {
        for (let compID in this.components) {
            this.logger.debug(`Sending Store Change Event to Component ${compID}`);
            this.components[compID]();
        }
    }

    /**
     * Set the state with a key-value pair
     *
     * @param {string} key the key name
     * @param {object} value the key value
     */
    setState(key, value) {
        this.state[key] = value;
    }

    /**
     * Get the state
     *
     * @return {object} value the key value
     */
    getState(key, value) {
        return this.state;
    }

    /**
     * Set a key in the state to a new value
     *
     * @param {string} key the key name
     * @param {object} value the key value
     * @throws exception if the key does not exist
     */
    set(key, value, squashEvent = false) {
        this.logger.debug(`Setting ${key}=${value}`);
        if (key in this.state) {
            this.state[key] = value;
            if (!squashEvent) {
                this.changeStore();
            }
        } else {
            throw `Unknown key ${key} in store`;
        }
    }

    /**
     * Retrieve a key in the state
     *
     * @param {string} key the key name
     * @returns {object} the key value
     * @throws exception if the key does not exist
     */
    get(key) {
        if (key in this.state) {
            return this.state[key];
        } else {
            throw `Unknown key ${key} in state`;
        }
    }

    /**
     * Generate an RFC-4122 Version 4 compliant Unique ID.  We only need
     * pseudo IDs since we are salting with the name of the store.
     *
     * @return {string}
     */
    get guid() {
        let u = '', i = 0;
        while (i++ < 36) {
            let c = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'[i - 1],
             r = Math.random() * 16 | 0, v = (c === 'x' ? r : ( r & 0x3 | 0x8));
            u += (c === '-' || c === '4') ? c : v.toString(16);
        }
        return u;
    }
}
