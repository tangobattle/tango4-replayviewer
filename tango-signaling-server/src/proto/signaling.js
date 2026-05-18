/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const tango = $root.tango = (() => {

    /**
     * Namespace tango.
     * @exports tango
     * @namespace
     */
    const tango = {};

    tango.signaling = (function() {

        /**
         * Namespace signaling.
         * @memberof tango
         * @namespace
         */
        const signaling = {};

        signaling.Packet = (function() {

            /**
             * Properties of a Packet.
             * @memberof tango.signaling
             * @interface IPacket
             * @property {tango.signaling.Packet.IHello|null} [hello] Packet hello
             * @property {tango.signaling.Packet.IStart|null} [start] Packet start
             * @property {tango.signaling.Packet.IOffer|null} [offer] Packet offer
             * @property {tango.signaling.Packet.IAnswer|null} [answer] Packet answer
             * @property {tango.signaling.Packet.IAbort|null} [abort] Packet abort
             */

            /**
             * Constructs a new Packet.
             * @memberof tango.signaling
             * @classdesc Represents a Packet.
             * @implements IPacket
             * @constructor
             * @param {tango.signaling.IPacket=} [properties] Properties to set
             */
            function Packet(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Packet hello.
             * @member {tango.signaling.Packet.IHello|null|undefined} hello
             * @memberof tango.signaling.Packet
             * @instance
             */
            Packet.prototype.hello = null;

            /**
             * Packet start.
             * @member {tango.signaling.Packet.IStart|null|undefined} start
             * @memberof tango.signaling.Packet
             * @instance
             */
            Packet.prototype.start = null;

            /**
             * Packet offer.
             * @member {tango.signaling.Packet.IOffer|null|undefined} offer
             * @memberof tango.signaling.Packet
             * @instance
             */
            Packet.prototype.offer = null;

            /**
             * Packet answer.
             * @member {tango.signaling.Packet.IAnswer|null|undefined} answer
             * @memberof tango.signaling.Packet
             * @instance
             */
            Packet.prototype.answer = null;

            /**
             * Packet abort.
             * @member {tango.signaling.Packet.IAbort|null|undefined} abort
             * @memberof tango.signaling.Packet
             * @instance
             */
            Packet.prototype.abort = null;

            // OneOf field names bound to virtual getters and setters
            let $oneOfFields;

            /**
             * Packet which.
             * @member {"hello"|"start"|"offer"|"answer"|"abort"|undefined} which
             * @memberof tango.signaling.Packet
             * @instance
             */
            Object.defineProperty(Packet.prototype, "which", {
                get: $util.oneOfGetter($oneOfFields = ["hello", "start", "offer", "answer", "abort"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Packet instance using the specified properties.
             * @function create
             * @memberof tango.signaling.Packet
             * @static
             * @param {tango.signaling.IPacket=} [properties] Properties to set
             * @returns {tango.signaling.Packet} Packet instance
             */
            Packet.create = function create(properties) {
                return new Packet(properties);
            };

            /**
             * Encodes the specified Packet message. Does not implicitly {@link tango.signaling.Packet.verify|verify} messages.
             * @function encode
             * @memberof tango.signaling.Packet
             * @static
             * @param {tango.signaling.IPacket} message Packet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Packet.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.start != null && Object.hasOwnProperty.call(message, "start"))
                    $root.tango.signaling.Packet.Start.encode(message.start, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.offer != null && Object.hasOwnProperty.call(message, "offer"))
                    $root.tango.signaling.Packet.Offer.encode(message.offer, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.answer != null && Object.hasOwnProperty.call(message, "answer"))
                    $root.tango.signaling.Packet.Answer.encode(message.answer, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.hello != null && Object.hasOwnProperty.call(message, "hello"))
                    $root.tango.signaling.Packet.Hello.encode(message.hello, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.abort != null && Object.hasOwnProperty.call(message, "abort"))
                    $root.tango.signaling.Packet.Abort.encode(message.abort, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Packet message, length delimited. Does not implicitly {@link tango.signaling.Packet.verify|verify} messages.
             * @function encodeDelimited
             * @memberof tango.signaling.Packet
             * @static
             * @param {tango.signaling.IPacket} message Packet message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Packet.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Packet message from the specified reader or buffer.
             * @function decode
             * @memberof tango.signaling.Packet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {tango.signaling.Packet} Packet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Packet.decode = function decode(reader, length, error, long) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (long === undefined)
                    long = 0;
                if (long > $Reader.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tango.signaling.Packet();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 4: {
                            message.hello = $root.tango.signaling.Packet.Hello.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 1: {
                            message.start = $root.tango.signaling.Packet.Start.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 2: {
                            message.offer = $root.tango.signaling.Packet.Offer.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 3: {
                            message.answer = $root.tango.signaling.Packet.Answer.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    case 5: {
                            message.abort = $root.tango.signaling.Packet.Abort.decode(reader, reader.uint32(), undefined, long + 1);
                            break;
                        }
                    default:
                        reader.skipType(tag & 7, long);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Packet message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof tango.signaling.Packet
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {tango.signaling.Packet} Packet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Packet.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Packet message.
             * @function verify
             * @memberof tango.signaling.Packet
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Packet.verify = function verify(message, long) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    return "maximum nesting depth exceeded";
                let properties = {};
                if (message.hello != null && message.hasOwnProperty("hello")) {
                    properties.which = 1;
                    {
                        let error = $root.tango.signaling.Packet.Hello.verify(message.hello, long + 1);
                        if (error)
                            return "hello." + error;
                    }
                }
                if (message.start != null && message.hasOwnProperty("start")) {
                    if (properties.which === 1)
                        return "which: multiple values";
                    properties.which = 1;
                    {
                        let error = $root.tango.signaling.Packet.Start.verify(message.start, long + 1);
                        if (error)
                            return "start." + error;
                    }
                }
                if (message.offer != null && message.hasOwnProperty("offer")) {
                    if (properties.which === 1)
                        return "which: multiple values";
                    properties.which = 1;
                    {
                        let error = $root.tango.signaling.Packet.Offer.verify(message.offer, long + 1);
                        if (error)
                            return "offer." + error;
                    }
                }
                if (message.answer != null && message.hasOwnProperty("answer")) {
                    if (properties.which === 1)
                        return "which: multiple values";
                    properties.which = 1;
                    {
                        let error = $root.tango.signaling.Packet.Answer.verify(message.answer, long + 1);
                        if (error)
                            return "answer." + error;
                    }
                }
                if (message.abort != null && message.hasOwnProperty("abort")) {
                    if (properties.which === 1)
                        return "which: multiple values";
                    properties.which = 1;
                    {
                        let error = $root.tango.signaling.Packet.Abort.verify(message.abort, long + 1);
                        if (error)
                            return "abort." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Packet message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof tango.signaling.Packet
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {tango.signaling.Packet} Packet
             */
            Packet.fromObject = function fromObject(object, long) {
                if (object instanceof $root.tango.signaling.Packet)
                    return object;
                if (long === undefined)
                    long = 0;
                if (long > $util.recursionLimit)
                    throw Error("maximum nesting depth exceeded");
                let message = new $root.tango.signaling.Packet();
                if (object.hello != null) {
                    if (typeof object.hello !== "object")
                        throw TypeError(".tango.signaling.Packet.hello: object expected");
                    message.hello = $root.tango.signaling.Packet.Hello.fromObject(object.hello, long + 1);
                }
                if (object.start != null) {
                    if (typeof object.start !== "object")
                        throw TypeError(".tango.signaling.Packet.start: object expected");
                    message.start = $root.tango.signaling.Packet.Start.fromObject(object.start, long + 1);
                }
                if (object.offer != null) {
                    if (typeof object.offer !== "object")
                        throw TypeError(".tango.signaling.Packet.offer: object expected");
                    message.offer = $root.tango.signaling.Packet.Offer.fromObject(object.offer, long + 1);
                }
                if (object.answer != null) {
                    if (typeof object.answer !== "object")
                        throw TypeError(".tango.signaling.Packet.answer: object expected");
                    message.answer = $root.tango.signaling.Packet.Answer.fromObject(object.answer, long + 1);
                }
                if (object.abort != null) {
                    if (typeof object.abort !== "object")
                        throw TypeError(".tango.signaling.Packet.abort: object expected");
                    message.abort = $root.tango.signaling.Packet.Abort.fromObject(object.abort, long + 1);
                }
                return message;
            };

            /**
             * Creates a plain object from a Packet message. Also converts values to other types if specified.
             * @function toObject
             * @memberof tango.signaling.Packet
             * @static
             * @param {tango.signaling.Packet} message Packet
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Packet.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (message.start != null && message.hasOwnProperty("start")) {
                    object.start = $root.tango.signaling.Packet.Start.toObject(message.start, options);
                    if (options.oneofs)
                        object.which = "start";
                }
                if (message.offer != null && message.hasOwnProperty("offer")) {
                    object.offer = $root.tango.signaling.Packet.Offer.toObject(message.offer, options);
                    if (options.oneofs)
                        object.which = "offer";
                }
                if (message.answer != null && message.hasOwnProperty("answer")) {
                    object.answer = $root.tango.signaling.Packet.Answer.toObject(message.answer, options);
                    if (options.oneofs)
                        object.which = "answer";
                }
                if (message.hello != null && message.hasOwnProperty("hello")) {
                    object.hello = $root.tango.signaling.Packet.Hello.toObject(message.hello, options);
                    if (options.oneofs)
                        object.which = "hello";
                }
                if (message.abort != null && message.hasOwnProperty("abort")) {
                    object.abort = $root.tango.signaling.Packet.Abort.toObject(message.abort, options);
                    if (options.oneofs)
                        object.which = "abort";
                }
                return object;
            };

            /**
             * Converts this Packet to JSON.
             * @function toJSON
             * @memberof tango.signaling.Packet
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Packet.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Packet
             * @function getTypeUrl
             * @memberof tango.signaling.Packet
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Packet.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/tango.signaling.Packet";
            };

            Packet.Hello = (function() {

                /**
                 * Properties of a Hello.
                 * @memberof tango.signaling.Packet
                 * @interface IHello
                 * @property {Array.<tango.signaling.Packet.Hello.IICEServer>|null} [iceServers] Hello iceServers
                 */

                /**
                 * Constructs a new Hello.
                 * @memberof tango.signaling.Packet
                 * @classdesc Represents a Hello.
                 * @implements IHello
                 * @constructor
                 * @param {tango.signaling.Packet.IHello=} [properties] Properties to set
                 */
                function Hello(properties) {
                    this.iceServers = [];
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Hello iceServers.
                 * @member {Array.<tango.signaling.Packet.Hello.IICEServer>} iceServers
                 * @memberof tango.signaling.Packet.Hello
                 * @instance
                 */
                Hello.prototype.iceServers = $util.emptyArray;

                /**
                 * Creates a new Hello instance using the specified properties.
                 * @function create
                 * @memberof tango.signaling.Packet.Hello
                 * @static
                 * @param {tango.signaling.Packet.IHello=} [properties] Properties to set
                 * @returns {tango.signaling.Packet.Hello} Hello instance
                 */
                Hello.create = function create(properties) {
                    return new Hello(properties);
                };

                /**
                 * Encodes the specified Hello message. Does not implicitly {@link tango.signaling.Packet.Hello.verify|verify} messages.
                 * @function encode
                 * @memberof tango.signaling.Packet.Hello
                 * @static
                 * @param {tango.signaling.Packet.IHello} message Hello message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Hello.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.iceServers != null && message.iceServers.length)
                        for (let i = 0; i < message.iceServers.length; ++i)
                            $root.tango.signaling.Packet.Hello.ICEServer.encode(message.iceServers[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified Hello message, length delimited. Does not implicitly {@link tango.signaling.Packet.Hello.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tango.signaling.Packet.Hello
                 * @static
                 * @param {tango.signaling.Packet.IHello} message Hello message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Hello.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Hello message from the specified reader or buffer.
                 * @function decode
                 * @memberof tango.signaling.Packet.Hello
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tango.signaling.Packet.Hello} Hello
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Hello.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tango.signaling.Packet.Hello();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                if (!(message.iceServers && message.iceServers.length))
                                    message.iceServers = [];
                                message.iceServers.push($root.tango.signaling.Packet.Hello.ICEServer.decode(reader, reader.uint32(), undefined, long + 1));
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Hello message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tango.signaling.Packet.Hello
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tango.signaling.Packet.Hello} Hello
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Hello.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Hello message.
                 * @function verify
                 * @memberof tango.signaling.Packet.Hello
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Hello.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.iceServers != null && message.hasOwnProperty("iceServers")) {
                        if (!Array.isArray(message.iceServers))
                            return "iceServers: array expected";
                        for (let i = 0; i < message.iceServers.length; ++i) {
                            let error = $root.tango.signaling.Packet.Hello.ICEServer.verify(message.iceServers[i], long + 1);
                            if (error)
                                return "iceServers." + error;
                        }
                    }
                    return null;
                };

                /**
                 * Creates a Hello message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tango.signaling.Packet.Hello
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tango.signaling.Packet.Hello} Hello
                 */
                Hello.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.tango.signaling.Packet.Hello)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.tango.signaling.Packet.Hello();
                    if (object.iceServers) {
                        if (!Array.isArray(object.iceServers))
                            throw TypeError(".tango.signaling.Packet.Hello.iceServers: array expected");
                        message.iceServers = [];
                        for (let i = 0; i < object.iceServers.length; ++i) {
                            if (typeof object.iceServers[i] !== "object")
                                throw TypeError(".tango.signaling.Packet.Hello.iceServers: object expected");
                            message.iceServers[i] = $root.tango.signaling.Packet.Hello.ICEServer.fromObject(object.iceServers[i], long + 1);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a Hello message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tango.signaling.Packet.Hello
                 * @static
                 * @param {tango.signaling.Packet.Hello} message Hello
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Hello.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.arrays || options.defaults)
                        object.iceServers = [];
                    if (message.iceServers && message.iceServers.length) {
                        object.iceServers = [];
                        for (let j = 0; j < message.iceServers.length; ++j)
                            object.iceServers[j] = $root.tango.signaling.Packet.Hello.ICEServer.toObject(message.iceServers[j], options);
                    }
                    return object;
                };

                /**
                 * Converts this Hello to JSON.
                 * @function toJSON
                 * @memberof tango.signaling.Packet.Hello
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Hello.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Hello
                 * @function getTypeUrl
                 * @memberof tango.signaling.Packet.Hello
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Hello.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tango.signaling.Packet.Hello";
                };

                Hello.ICEServer = (function() {

                    /**
                     * Properties of a ICEServer.
                     * @memberof tango.signaling.Packet.Hello
                     * @interface IICEServer
                     * @property {string|null} [credential] ICEServer credential
                     * @property {string|null} [username] ICEServer username
                     * @property {Array.<string>|null} [urls] ICEServer urls
                     */

                    /**
                     * Constructs a new ICEServer.
                     * @memberof tango.signaling.Packet.Hello
                     * @classdesc Represents a ICEServer.
                     * @implements IICEServer
                     * @constructor
                     * @param {tango.signaling.Packet.Hello.IICEServer=} [properties] Properties to set
                     */
                    function ICEServer(properties) {
                        this.urls = [];
                        if (properties)
                            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                    this[keys[i]] = properties[keys[i]];
                    }

                    /**
                     * ICEServer credential.
                     * @member {string|null|undefined} credential
                     * @memberof tango.signaling.Packet.Hello.ICEServer
                     * @instance
                     */
                    ICEServer.prototype.credential = null;

                    /**
                     * ICEServer username.
                     * @member {string|null|undefined} username
                     * @memberof tango.signaling.Packet.Hello.ICEServer
                     * @instance
                     */
                    ICEServer.prototype.username = null;

                    /**
                     * ICEServer urls.
                     * @member {Array.<string>} urls
                     * @memberof tango.signaling.Packet.Hello.ICEServer
                     * @instance
                     */
                    ICEServer.prototype.urls = $util.emptyArray;

                    // OneOf field names bound to virtual getters and setters
                    let $oneOfFields;

                    // Virtual OneOf for proto3 optional field
                    Object.defineProperty(ICEServer.prototype, "_credential", {
                        get: $util.oneOfGetter($oneOfFields = ["credential"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    // Virtual OneOf for proto3 optional field
                    Object.defineProperty(ICEServer.prototype, "_username", {
                        get: $util.oneOfGetter($oneOfFields = ["username"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });

                    /**
                     * Creates a new ICEServer instance using the specified properties.
                     * @function create
                     * @memberof tango.signaling.Packet.Hello.ICEServer
                     * @static
                     * @param {tango.signaling.Packet.Hello.IICEServer=} [properties] Properties to set
                     * @returns {tango.signaling.Packet.Hello.ICEServer} ICEServer instance
                     */
                    ICEServer.create = function create(properties) {
                        return new ICEServer(properties);
                    };

                    /**
                     * Encodes the specified ICEServer message. Does not implicitly {@link tango.signaling.Packet.Hello.ICEServer.verify|verify} messages.
                     * @function encode
                     * @memberof tango.signaling.Packet.Hello.ICEServer
                     * @static
                     * @param {tango.signaling.Packet.Hello.IICEServer} message ICEServer message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ICEServer.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.credential != null && Object.hasOwnProperty.call(message, "credential"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.credential);
                        if (message.username != null && Object.hasOwnProperty.call(message, "username"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
                        if (message.urls != null && message.urls.length)
                            for (let i = 0; i < message.urls.length; ++i)
                                writer.uint32(/* id 3, wireType 2 =*/26).string(message.urls[i]);
                        return writer;
                    };

                    /**
                     * Encodes the specified ICEServer message, length delimited. Does not implicitly {@link tango.signaling.Packet.Hello.ICEServer.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof tango.signaling.Packet.Hello.ICEServer
                     * @static
                     * @param {tango.signaling.Packet.Hello.IICEServer} message ICEServer message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ICEServer.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };

                    /**
                     * Decodes a ICEServer message from the specified reader or buffer.
                     * @function decode
                     * @memberof tango.signaling.Packet.Hello.ICEServer
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {tango.signaling.Packet.Hello.ICEServer} ICEServer
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ICEServer.decode = function decode(reader, length, error, long) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        if (long === undefined)
                            long = 0;
                        if (long > $Reader.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tango.signaling.Packet.Hello.ICEServer();
                        while (reader.pos < end) {
                            let tag = reader.uint32();
                            if (tag === error)
                                break;
                            switch (tag >>> 3) {
                            case 1: {
                                    message.credential = reader.string();
                                    break;
                                }
                            case 2: {
                                    message.username = reader.string();
                                    break;
                                }
                            case 3: {
                                    if (!(message.urls && message.urls.length))
                                        message.urls = [];
                                    message.urls.push(reader.string());
                                    break;
                                }
                            default:
                                reader.skipType(tag & 7, long);
                                break;
                            }
                        }
                        return message;
                    };

                    /**
                     * Decodes a ICEServer message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof tango.signaling.Packet.Hello.ICEServer
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {tango.signaling.Packet.Hello.ICEServer} ICEServer
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ICEServer.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };

                    /**
                     * Verifies a ICEServer message.
                     * @function verify
                     * @memberof tango.signaling.Packet.Hello.ICEServer
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ICEServer.verify = function verify(message, long) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            return "maximum nesting depth exceeded";
                        let properties = {};
                        if (message.credential != null && message.hasOwnProperty("credential")) {
                            properties._credential = 1;
                            if (!$util.isString(message.credential))
                                return "credential: string expected";
                        }
                        if (message.username != null && message.hasOwnProperty("username")) {
                            properties._username = 1;
                            if (!$util.isString(message.username))
                                return "username: string expected";
                        }
                        if (message.urls != null && message.hasOwnProperty("urls")) {
                            if (!Array.isArray(message.urls))
                                return "urls: array expected";
                            for (let i = 0; i < message.urls.length; ++i)
                                if (!$util.isString(message.urls[i]))
                                    return "urls: string[] expected";
                        }
                        return null;
                    };

                    /**
                     * Creates a ICEServer message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof tango.signaling.Packet.Hello.ICEServer
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {tango.signaling.Packet.Hello.ICEServer} ICEServer
                     */
                    ICEServer.fromObject = function fromObject(object, long) {
                        if (object instanceof $root.tango.signaling.Packet.Hello.ICEServer)
                            return object;
                        if (long === undefined)
                            long = 0;
                        if (long > $util.recursionLimit)
                            throw Error("maximum nesting depth exceeded");
                        let message = new $root.tango.signaling.Packet.Hello.ICEServer();
                        if (object.credential != null)
                            message.credential = String(object.credential);
                        if (object.username != null)
                            message.username = String(object.username);
                        if (object.urls) {
                            if (!Array.isArray(object.urls))
                                throw TypeError(".tango.signaling.Packet.Hello.ICEServer.urls: array expected");
                            message.urls = [];
                            for (let i = 0; i < object.urls.length; ++i)
                                message.urls[i] = String(object.urls[i]);
                        }
                        return message;
                    };

                    /**
                     * Creates a plain object from a ICEServer message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof tango.signaling.Packet.Hello.ICEServer
                     * @static
                     * @param {tango.signaling.Packet.Hello.ICEServer} message ICEServer
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ICEServer.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        let object = {};
                        if (options.arrays || options.defaults)
                            object.urls = [];
                        if (message.credential != null && message.hasOwnProperty("credential")) {
                            object.credential = message.credential;
                            if (options.oneofs)
                                object._credential = "credential";
                        }
                        if (message.username != null && message.hasOwnProperty("username")) {
                            object.username = message.username;
                            if (options.oneofs)
                                object._username = "username";
                        }
                        if (message.urls && message.urls.length) {
                            object.urls = [];
                            for (let j = 0; j < message.urls.length; ++j)
                                object.urls[j] = message.urls[j];
                        }
                        return object;
                    };

                    /**
                     * Converts this ICEServer to JSON.
                     * @function toJSON
                     * @memberof tango.signaling.Packet.Hello.ICEServer
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ICEServer.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };

                    /**
                     * Gets the default type url for ICEServer
                     * @function getTypeUrl
                     * @memberof tango.signaling.Packet.Hello.ICEServer
                     * @static
                     * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns {string} The default type url
                     */
                    ICEServer.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                        if (typeUrlPrefix === undefined) {
                            typeUrlPrefix = "type.googleapis.com";
                        }
                        return typeUrlPrefix + "/tango.signaling.Packet.Hello.ICEServer";
                    };

                    return ICEServer;
                })();

                return Hello;
            })();

            Packet.Start = (function() {

                /**
                 * Properties of a Start.
                 * @memberof tango.signaling.Packet
                 * @interface IStart
                 * @property {number|null} [protocolVersion] Start protocolVersion
                 * @property {string|null} [offerSdp] Start offerSdp
                 */

                /**
                 * Constructs a new Start.
                 * @memberof tango.signaling.Packet
                 * @classdesc Represents a Start.
                 * @implements IStart
                 * @constructor
                 * @param {tango.signaling.Packet.IStart=} [properties] Properties to set
                 */
                function Start(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Start protocolVersion.
                 * @member {number} protocolVersion
                 * @memberof tango.signaling.Packet.Start
                 * @instance
                 */
                Start.prototype.protocolVersion = 0;

                /**
                 * Start offerSdp.
                 * @member {string} offerSdp
                 * @memberof tango.signaling.Packet.Start
                 * @instance
                 */
                Start.prototype.offerSdp = "";

                /**
                 * Creates a new Start instance using the specified properties.
                 * @function create
                 * @memberof tango.signaling.Packet.Start
                 * @static
                 * @param {tango.signaling.Packet.IStart=} [properties] Properties to set
                 * @returns {tango.signaling.Packet.Start} Start instance
                 */
                Start.create = function create(properties) {
                    return new Start(properties);
                };

                /**
                 * Encodes the specified Start message. Does not implicitly {@link tango.signaling.Packet.Start.verify|verify} messages.
                 * @function encode
                 * @memberof tango.signaling.Packet.Start
                 * @static
                 * @param {tango.signaling.Packet.IStart} message Start message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Start.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.protocolVersion != null && Object.hasOwnProperty.call(message, "protocolVersion"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.protocolVersion);
                    if (message.offerSdp != null && Object.hasOwnProperty.call(message, "offerSdp"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.offerSdp);
                    return writer;
                };

                /**
                 * Encodes the specified Start message, length delimited. Does not implicitly {@link tango.signaling.Packet.Start.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tango.signaling.Packet.Start
                 * @static
                 * @param {tango.signaling.Packet.IStart} message Start message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Start.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Start message from the specified reader or buffer.
                 * @function decode
                 * @memberof tango.signaling.Packet.Start
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tango.signaling.Packet.Start} Start
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Start.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tango.signaling.Packet.Start();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.protocolVersion = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.offerSdp = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Start message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tango.signaling.Packet.Start
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tango.signaling.Packet.Start} Start
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Start.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Start message.
                 * @function verify
                 * @memberof tango.signaling.Packet.Start
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Start.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
                        if (!$util.isInteger(message.protocolVersion))
                            return "protocolVersion: integer expected";
                    if (message.offerSdp != null && message.hasOwnProperty("offerSdp"))
                        if (!$util.isString(message.offerSdp))
                            return "offerSdp: string expected";
                    return null;
                };

                /**
                 * Creates a Start message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tango.signaling.Packet.Start
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tango.signaling.Packet.Start} Start
                 */
                Start.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.tango.signaling.Packet.Start)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.tango.signaling.Packet.Start();
                    if (object.protocolVersion != null)
                        message.protocolVersion = object.protocolVersion >>> 0;
                    if (object.offerSdp != null)
                        message.offerSdp = String(object.offerSdp);
                    return message;
                };

                /**
                 * Creates a plain object from a Start message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tango.signaling.Packet.Start
                 * @static
                 * @param {tango.signaling.Packet.Start} message Start
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Start.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.protocolVersion = 0;
                        object.offerSdp = "";
                    }
                    if (message.protocolVersion != null && message.hasOwnProperty("protocolVersion"))
                        object.protocolVersion = message.protocolVersion;
                    if (message.offerSdp != null && message.hasOwnProperty("offerSdp"))
                        object.offerSdp = message.offerSdp;
                    return object;
                };

                /**
                 * Converts this Start to JSON.
                 * @function toJSON
                 * @memberof tango.signaling.Packet.Start
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Start.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Start
                 * @function getTypeUrl
                 * @memberof tango.signaling.Packet.Start
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Start.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tango.signaling.Packet.Start";
                };

                return Start;
            })();

            Packet.Offer = (function() {

                /**
                 * Properties of an Offer.
                 * @memberof tango.signaling.Packet
                 * @interface IOffer
                 * @property {string|null} [sdp] Offer sdp
                 */

                /**
                 * Constructs a new Offer.
                 * @memberof tango.signaling.Packet
                 * @classdesc Represents an Offer.
                 * @implements IOffer
                 * @constructor
                 * @param {tango.signaling.Packet.IOffer=} [properties] Properties to set
                 */
                function Offer(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Offer sdp.
                 * @member {string} sdp
                 * @memberof tango.signaling.Packet.Offer
                 * @instance
                 */
                Offer.prototype.sdp = "";

                /**
                 * Creates a new Offer instance using the specified properties.
                 * @function create
                 * @memberof tango.signaling.Packet.Offer
                 * @static
                 * @param {tango.signaling.Packet.IOffer=} [properties] Properties to set
                 * @returns {tango.signaling.Packet.Offer} Offer instance
                 */
                Offer.create = function create(properties) {
                    return new Offer(properties);
                };

                /**
                 * Encodes the specified Offer message. Does not implicitly {@link tango.signaling.Packet.Offer.verify|verify} messages.
                 * @function encode
                 * @memberof tango.signaling.Packet.Offer
                 * @static
                 * @param {tango.signaling.Packet.IOffer} message Offer message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Offer.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.sdp != null && Object.hasOwnProperty.call(message, "sdp"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.sdp);
                    return writer;
                };

                /**
                 * Encodes the specified Offer message, length delimited. Does not implicitly {@link tango.signaling.Packet.Offer.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tango.signaling.Packet.Offer
                 * @static
                 * @param {tango.signaling.Packet.IOffer} message Offer message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Offer.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an Offer message from the specified reader or buffer.
                 * @function decode
                 * @memberof tango.signaling.Packet.Offer
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tango.signaling.Packet.Offer} Offer
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Offer.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tango.signaling.Packet.Offer();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.sdp = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an Offer message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tango.signaling.Packet.Offer
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tango.signaling.Packet.Offer} Offer
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Offer.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an Offer message.
                 * @function verify
                 * @memberof tango.signaling.Packet.Offer
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Offer.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.sdp != null && message.hasOwnProperty("sdp"))
                        if (!$util.isString(message.sdp))
                            return "sdp: string expected";
                    return null;
                };

                /**
                 * Creates an Offer message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tango.signaling.Packet.Offer
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tango.signaling.Packet.Offer} Offer
                 */
                Offer.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.tango.signaling.Packet.Offer)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.tango.signaling.Packet.Offer();
                    if (object.sdp != null)
                        message.sdp = String(object.sdp);
                    return message;
                };

                /**
                 * Creates a plain object from an Offer message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tango.signaling.Packet.Offer
                 * @static
                 * @param {tango.signaling.Packet.Offer} message Offer
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Offer.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.sdp = "";
                    if (message.sdp != null && message.hasOwnProperty("sdp"))
                        object.sdp = message.sdp;
                    return object;
                };

                /**
                 * Converts this Offer to JSON.
                 * @function toJSON
                 * @memberof tango.signaling.Packet.Offer
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Offer.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Offer
                 * @function getTypeUrl
                 * @memberof tango.signaling.Packet.Offer
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Offer.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tango.signaling.Packet.Offer";
                };

                return Offer;
            })();

            Packet.Answer = (function() {

                /**
                 * Properties of an Answer.
                 * @memberof tango.signaling.Packet
                 * @interface IAnswer
                 * @property {string|null} [sdp] Answer sdp
                 */

                /**
                 * Constructs a new Answer.
                 * @memberof tango.signaling.Packet
                 * @classdesc Represents an Answer.
                 * @implements IAnswer
                 * @constructor
                 * @param {tango.signaling.Packet.IAnswer=} [properties] Properties to set
                 */
                function Answer(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Answer sdp.
                 * @member {string} sdp
                 * @memberof tango.signaling.Packet.Answer
                 * @instance
                 */
                Answer.prototype.sdp = "";

                /**
                 * Creates a new Answer instance using the specified properties.
                 * @function create
                 * @memberof tango.signaling.Packet.Answer
                 * @static
                 * @param {tango.signaling.Packet.IAnswer=} [properties] Properties to set
                 * @returns {tango.signaling.Packet.Answer} Answer instance
                 */
                Answer.create = function create(properties) {
                    return new Answer(properties);
                };

                /**
                 * Encodes the specified Answer message. Does not implicitly {@link tango.signaling.Packet.Answer.verify|verify} messages.
                 * @function encode
                 * @memberof tango.signaling.Packet.Answer
                 * @static
                 * @param {tango.signaling.Packet.IAnswer} message Answer message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Answer.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.sdp != null && Object.hasOwnProperty.call(message, "sdp"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.sdp);
                    return writer;
                };

                /**
                 * Encodes the specified Answer message, length delimited. Does not implicitly {@link tango.signaling.Packet.Answer.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tango.signaling.Packet.Answer
                 * @static
                 * @param {tango.signaling.Packet.IAnswer} message Answer message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Answer.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an Answer message from the specified reader or buffer.
                 * @function decode
                 * @memberof tango.signaling.Packet.Answer
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tango.signaling.Packet.Answer} Answer
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Answer.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tango.signaling.Packet.Answer();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.sdp = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an Answer message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tango.signaling.Packet.Answer
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tango.signaling.Packet.Answer} Answer
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Answer.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an Answer message.
                 * @function verify
                 * @memberof tango.signaling.Packet.Answer
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Answer.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.sdp != null && message.hasOwnProperty("sdp"))
                        if (!$util.isString(message.sdp))
                            return "sdp: string expected";
                    return null;
                };

                /**
                 * Creates an Answer message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tango.signaling.Packet.Answer
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tango.signaling.Packet.Answer} Answer
                 */
                Answer.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.tango.signaling.Packet.Answer)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.tango.signaling.Packet.Answer();
                    if (object.sdp != null)
                        message.sdp = String(object.sdp);
                    return message;
                };

                /**
                 * Creates a plain object from an Answer message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tango.signaling.Packet.Answer
                 * @static
                 * @param {tango.signaling.Packet.Answer} message Answer
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Answer.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.sdp = "";
                    if (message.sdp != null && message.hasOwnProperty("sdp"))
                        object.sdp = message.sdp;
                    return object;
                };

                /**
                 * Converts this Answer to JSON.
                 * @function toJSON
                 * @memberof tango.signaling.Packet.Answer
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Answer.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Answer
                 * @function getTypeUrl
                 * @memberof tango.signaling.Packet.Answer
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Answer.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tango.signaling.Packet.Answer";
                };

                return Answer;
            })();

            Packet.Abort = (function() {

                /**
                 * Properties of an Abort.
                 * @memberof tango.signaling.Packet
                 * @interface IAbort
                 * @property {tango.signaling.Packet.Abort.Reason|null} [reason] Abort reason
                 */

                /**
                 * Constructs a new Abort.
                 * @memberof tango.signaling.Packet
                 * @classdesc Represents an Abort.
                 * @implements IAbort
                 * @constructor
                 * @param {tango.signaling.Packet.IAbort=} [properties] Properties to set
                 */
                function Abort(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null && keys[i] !== "__proto__")
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Abort reason.
                 * @member {tango.signaling.Packet.Abort.Reason} reason
                 * @memberof tango.signaling.Packet.Abort
                 * @instance
                 */
                Abort.prototype.reason = 0;

                /**
                 * Creates a new Abort instance using the specified properties.
                 * @function create
                 * @memberof tango.signaling.Packet.Abort
                 * @static
                 * @param {tango.signaling.Packet.IAbort=} [properties] Properties to set
                 * @returns {tango.signaling.Packet.Abort} Abort instance
                 */
                Abort.create = function create(properties) {
                    return new Abort(properties);
                };

                /**
                 * Encodes the specified Abort message. Does not implicitly {@link tango.signaling.Packet.Abort.verify|verify} messages.
                 * @function encode
                 * @memberof tango.signaling.Packet.Abort
                 * @static
                 * @param {tango.signaling.Packet.IAbort} message Abort message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Abort.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                        writer.uint32(/* id 1, wireType 0 =*/8).int32(message.reason);
                    return writer;
                };

                /**
                 * Encodes the specified Abort message, length delimited. Does not implicitly {@link tango.signaling.Packet.Abort.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof tango.signaling.Packet.Abort
                 * @static
                 * @param {tango.signaling.Packet.IAbort} message Abort message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Abort.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an Abort message from the specified reader or buffer.
                 * @function decode
                 * @memberof tango.signaling.Packet.Abort
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {tango.signaling.Packet.Abort} Abort
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Abort.decode = function decode(reader, length, error, long) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    if (long === undefined)
                        long = 0;
                    if (long > $Reader.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.tango.signaling.Packet.Abort();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        if (tag === error)
                            break;
                        switch (tag >>> 3) {
                        case 1: {
                                message.reason = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7, long);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an Abort message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof tango.signaling.Packet.Abort
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {tango.signaling.Packet.Abort} Abort
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Abort.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an Abort message.
                 * @function verify
                 * @memberof tango.signaling.Packet.Abort
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Abort.verify = function verify(message, long) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        return "maximum nesting depth exceeded";
                    if (message.reason != null && message.hasOwnProperty("reason"))
                        switch (message.reason) {
                        default:
                            return "reason: enum value expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates an Abort message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof tango.signaling.Packet.Abort
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {tango.signaling.Packet.Abort} Abort
                 */
                Abort.fromObject = function fromObject(object, long) {
                    if (object instanceof $root.tango.signaling.Packet.Abort)
                        return object;
                    if (long === undefined)
                        long = 0;
                    if (long > $util.recursionLimit)
                        throw Error("maximum nesting depth exceeded");
                    let message = new $root.tango.signaling.Packet.Abort();
                    switch (object.reason) {
                    default:
                        if (typeof object.reason === "number") {
                            message.reason = object.reason;
                            break;
                        }
                        break;
                    case "REASON_UNKNOWN":
                    case 0:
                        message.reason = 0;
                        break;
                    case "REASON_PROTOCOL_VERSION_TOO_OLD":
                    case 1:
                        message.reason = 1;
                        break;
                    case "REASON_PROTOCOL_VERSION_TOO_NEW":
                    case 2:
                        message.reason = 2;
                        break;
                    case "REASON_MISSING_SESSION_ID":
                    case 3:
                        message.reason = 3;
                        break;
                    case "REASON_NOT_UPGRADE":
                    case 4:
                        message.reason = 4;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from an Abort message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof tango.signaling.Packet.Abort
                 * @static
                 * @param {tango.signaling.Packet.Abort} message Abort
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Abort.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults)
                        object.reason = options.enums === String ? "REASON_UNKNOWN" : 0;
                    if (message.reason != null && message.hasOwnProperty("reason"))
                        object.reason = options.enums === String ? $root.tango.signaling.Packet.Abort.Reason[message.reason] === undefined ? message.reason : $root.tango.signaling.Packet.Abort.Reason[message.reason] : message.reason;
                    return object;
                };

                /**
                 * Converts this Abort to JSON.
                 * @function toJSON
                 * @memberof tango.signaling.Packet.Abort
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Abort.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Abort
                 * @function getTypeUrl
                 * @memberof tango.signaling.Packet.Abort
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Abort.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/tango.signaling.Packet.Abort";
                };

                /**
                 * Reason enum.
                 * @name tango.signaling.Packet.Abort.Reason
                 * @enum {number}
                 * @property {number} REASON_UNKNOWN=0 REASON_UNKNOWN value
                 * @property {number} REASON_PROTOCOL_VERSION_TOO_OLD=1 REASON_PROTOCOL_VERSION_TOO_OLD value
                 * @property {number} REASON_PROTOCOL_VERSION_TOO_NEW=2 REASON_PROTOCOL_VERSION_TOO_NEW value
                 * @property {number} REASON_MISSING_SESSION_ID=3 REASON_MISSING_SESSION_ID value
                 * @property {number} REASON_NOT_UPGRADE=4 REASON_NOT_UPGRADE value
                 */
                Abort.Reason = (function() {
                    const valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "REASON_UNKNOWN"] = 0;
                    values[valuesById[1] = "REASON_PROTOCOL_VERSION_TOO_OLD"] = 1;
                    values[valuesById[2] = "REASON_PROTOCOL_VERSION_TOO_NEW"] = 2;
                    values[valuesById[3] = "REASON_MISSING_SESSION_ID"] = 3;
                    values[valuesById[4] = "REASON_NOT_UPGRADE"] = 4;
                    return values;
                })();

                return Abort;
            })();

            return Packet;
        })();

        return signaling;
    })();

    return tango;
})();

export { $root as default };
