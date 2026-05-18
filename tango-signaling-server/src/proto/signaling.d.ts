import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace tango. */
export namespace tango {

    /** Namespace signaling. */
    namespace signaling {

        /** Properties of a Packet. */
        interface IPacket {

            /** Packet hello */
            hello?: (tango.signaling.Packet.IHello|null);

            /** Packet start */
            start?: (tango.signaling.Packet.IStart|null);

            /** Packet offer */
            offer?: (tango.signaling.Packet.IOffer|null);

            /** Packet answer */
            answer?: (tango.signaling.Packet.IAnswer|null);

            /** Packet abort */
            abort?: (tango.signaling.Packet.IAbort|null);
        }

        /** Represents a Packet. */
        class Packet implements IPacket {

            /**
             * Constructs a new Packet.
             * @param [properties] Properties to set
             */
            constructor(properties?: tango.signaling.IPacket);

            /** Packet hello. */
            public hello?: (tango.signaling.Packet.IHello|null);

            /** Packet start. */
            public start?: (tango.signaling.Packet.IStart|null);

            /** Packet offer. */
            public offer?: (tango.signaling.Packet.IOffer|null);

            /** Packet answer. */
            public answer?: (tango.signaling.Packet.IAnswer|null);

            /** Packet abort. */
            public abort?: (tango.signaling.Packet.IAbort|null);

            /** Packet which. */
            public which?: ("hello"|"start"|"offer"|"answer"|"abort");

            /**
             * Creates a new Packet instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Packet instance
             */
            public static create(properties?: tango.signaling.IPacket): tango.signaling.Packet;

            /**
             * Encodes the specified Packet message. Does not implicitly {@link tango.signaling.Packet.verify|verify} messages.
             * @param message Packet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: tango.signaling.IPacket, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Packet message, length delimited. Does not implicitly {@link tango.signaling.Packet.verify|verify} messages.
             * @param message Packet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: tango.signaling.IPacket, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Packet message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Packet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tango.signaling.Packet;

            /**
             * Decodes a Packet message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Packet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tango.signaling.Packet;

            /**
             * Verifies a Packet message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Packet message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Packet
             */
            public static fromObject(object: { [k: string]: any }): tango.signaling.Packet;

            /**
             * Creates a plain object from a Packet message. Also converts values to other types if specified.
             * @param message Packet
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: tango.signaling.Packet, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Packet to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Packet
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Packet {

            /** Properties of a Hello. */
            interface IHello {

                /** Hello iceServers */
                iceServers?: (tango.signaling.Packet.Hello.IICEServer[]|null);
            }

            /** Represents a Hello. */
            class Hello implements IHello {

                /**
                 * Constructs a new Hello.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tango.signaling.Packet.IHello);

                /** Hello iceServers. */
                public iceServers: tango.signaling.Packet.Hello.IICEServer[];

                /**
                 * Creates a new Hello instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Hello instance
                 */
                public static create(properties?: tango.signaling.Packet.IHello): tango.signaling.Packet.Hello;

                /**
                 * Encodes the specified Hello message. Does not implicitly {@link tango.signaling.Packet.Hello.verify|verify} messages.
                 * @param message Hello message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tango.signaling.Packet.IHello, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Hello message, length delimited. Does not implicitly {@link tango.signaling.Packet.Hello.verify|verify} messages.
                 * @param message Hello message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tango.signaling.Packet.IHello, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Hello message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Hello
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tango.signaling.Packet.Hello;

                /**
                 * Decodes a Hello message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Hello
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tango.signaling.Packet.Hello;

                /**
                 * Verifies a Hello message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Hello message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Hello
                 */
                public static fromObject(object: { [k: string]: any }): tango.signaling.Packet.Hello;

                /**
                 * Creates a plain object from a Hello message. Also converts values to other types if specified.
                 * @param message Hello
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tango.signaling.Packet.Hello, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Hello to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Hello
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace Hello {

                /** Properties of a ICEServer. */
                interface IICEServer {

                    /** ICEServer credential */
                    credential?: (string|null);

                    /** ICEServer username */
                    username?: (string|null);

                    /** ICEServer urls */
                    urls?: (string[]|null);
                }

                /** Represents a ICEServer. */
                class ICEServer implements IICEServer {

                    /**
                     * Constructs a new ICEServer.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: tango.signaling.Packet.Hello.IICEServer);

                    /** ICEServer credential. */
                    public credential?: (string|null);

                    /** ICEServer username. */
                    public username?: (string|null);

                    /** ICEServer urls. */
                    public urls: string[];

                    /**
                     * Creates a new ICEServer instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ICEServer instance
                     */
                    public static create(properties?: tango.signaling.Packet.Hello.IICEServer): tango.signaling.Packet.Hello.ICEServer;

                    /**
                     * Encodes the specified ICEServer message. Does not implicitly {@link tango.signaling.Packet.Hello.ICEServer.verify|verify} messages.
                     * @param message ICEServer message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: tango.signaling.Packet.Hello.IICEServer, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified ICEServer message, length delimited. Does not implicitly {@link tango.signaling.Packet.Hello.ICEServer.verify|verify} messages.
                     * @param message ICEServer message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: tango.signaling.Packet.Hello.IICEServer, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ICEServer message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns ICEServer
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tango.signaling.Packet.Hello.ICEServer;

                    /**
                     * Decodes a ICEServer message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns ICEServer
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tango.signaling.Packet.Hello.ICEServer;

                    /**
                     * Verifies a ICEServer message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a ICEServer message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns ICEServer
                     */
                    public static fromObject(object: { [k: string]: any }): tango.signaling.Packet.Hello.ICEServer;

                    /**
                     * Creates a plain object from a ICEServer message. Also converts values to other types if specified.
                     * @param message ICEServer
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: tango.signaling.Packet.Hello.ICEServer, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this ICEServer to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };

                    /**
                     * Gets the default type url for ICEServer
                     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                     * @returns The default type url
                     */
                    public static getTypeUrl(typeUrlPrefix?: string): string;
                }
            }

            /** Properties of a Start. */
            interface IStart {

                /** Start protocolVersion */
                protocolVersion?: (number|null);

                /** Start offerSdp */
                offerSdp?: (string|null);
            }

            /** Represents a Start. */
            class Start implements IStart {

                /**
                 * Constructs a new Start.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tango.signaling.Packet.IStart);

                /** Start protocolVersion. */
                public protocolVersion: number;

                /** Start offerSdp. */
                public offerSdp: string;

                /**
                 * Creates a new Start instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Start instance
                 */
                public static create(properties?: tango.signaling.Packet.IStart): tango.signaling.Packet.Start;

                /**
                 * Encodes the specified Start message. Does not implicitly {@link tango.signaling.Packet.Start.verify|verify} messages.
                 * @param message Start message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tango.signaling.Packet.IStart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Start message, length delimited. Does not implicitly {@link tango.signaling.Packet.Start.verify|verify} messages.
                 * @param message Start message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tango.signaling.Packet.IStart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Start message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Start
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tango.signaling.Packet.Start;

                /**
                 * Decodes a Start message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Start
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tango.signaling.Packet.Start;

                /**
                 * Verifies a Start message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Start message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Start
                 */
                public static fromObject(object: { [k: string]: any }): tango.signaling.Packet.Start;

                /**
                 * Creates a plain object from a Start message. Also converts values to other types if specified.
                 * @param message Start
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tango.signaling.Packet.Start, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Start to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Start
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an Offer. */
            interface IOffer {

                /** Offer sdp */
                sdp?: (string|null);
            }

            /** Represents an Offer. */
            class Offer implements IOffer {

                /**
                 * Constructs a new Offer.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tango.signaling.Packet.IOffer);

                /** Offer sdp. */
                public sdp: string;

                /**
                 * Creates a new Offer instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Offer instance
                 */
                public static create(properties?: tango.signaling.Packet.IOffer): tango.signaling.Packet.Offer;

                /**
                 * Encodes the specified Offer message. Does not implicitly {@link tango.signaling.Packet.Offer.verify|verify} messages.
                 * @param message Offer message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tango.signaling.Packet.IOffer, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Offer message, length delimited. Does not implicitly {@link tango.signaling.Packet.Offer.verify|verify} messages.
                 * @param message Offer message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tango.signaling.Packet.IOffer, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Offer message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Offer
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tango.signaling.Packet.Offer;

                /**
                 * Decodes an Offer message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Offer
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tango.signaling.Packet.Offer;

                /**
                 * Verifies an Offer message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Offer message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Offer
                 */
                public static fromObject(object: { [k: string]: any }): tango.signaling.Packet.Offer;

                /**
                 * Creates a plain object from an Offer message. Also converts values to other types if specified.
                 * @param message Offer
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tango.signaling.Packet.Offer, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Offer to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Offer
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an Answer. */
            interface IAnswer {

                /** Answer sdp */
                sdp?: (string|null);
            }

            /** Represents an Answer. */
            class Answer implements IAnswer {

                /**
                 * Constructs a new Answer.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tango.signaling.Packet.IAnswer);

                /** Answer sdp. */
                public sdp: string;

                /**
                 * Creates a new Answer instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Answer instance
                 */
                public static create(properties?: tango.signaling.Packet.IAnswer): tango.signaling.Packet.Answer;

                /**
                 * Encodes the specified Answer message. Does not implicitly {@link tango.signaling.Packet.Answer.verify|verify} messages.
                 * @param message Answer message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tango.signaling.Packet.IAnswer, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Answer message, length delimited. Does not implicitly {@link tango.signaling.Packet.Answer.verify|verify} messages.
                 * @param message Answer message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tango.signaling.Packet.IAnswer, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Answer message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Answer
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tango.signaling.Packet.Answer;

                /**
                 * Decodes an Answer message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Answer
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tango.signaling.Packet.Answer;

                /**
                 * Verifies an Answer message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Answer message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Answer
                 */
                public static fromObject(object: { [k: string]: any }): tango.signaling.Packet.Answer;

                /**
                 * Creates a plain object from an Answer message. Also converts values to other types if specified.
                 * @param message Answer
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tango.signaling.Packet.Answer, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Answer to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Answer
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an Abort. */
            interface IAbort {

                /** Abort reason */
                reason?: (tango.signaling.Packet.Abort.Reason|null);
            }

            /** Represents an Abort. */
            class Abort implements IAbort {

                /**
                 * Constructs a new Abort.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: tango.signaling.Packet.IAbort);

                /** Abort reason. */
                public reason: tango.signaling.Packet.Abort.Reason;

                /**
                 * Creates a new Abort instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Abort instance
                 */
                public static create(properties?: tango.signaling.Packet.IAbort): tango.signaling.Packet.Abort;

                /**
                 * Encodes the specified Abort message. Does not implicitly {@link tango.signaling.Packet.Abort.verify|verify} messages.
                 * @param message Abort message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: tango.signaling.Packet.IAbort, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Abort message, length delimited. Does not implicitly {@link tango.signaling.Packet.Abort.verify|verify} messages.
                 * @param message Abort message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: tango.signaling.Packet.IAbort, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Abort message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Abort
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): tango.signaling.Packet.Abort;

                /**
                 * Decodes an Abort message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Abort
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): tango.signaling.Packet.Abort;

                /**
                 * Verifies an Abort message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Abort message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Abort
                 */
                public static fromObject(object: { [k: string]: any }): tango.signaling.Packet.Abort;

                /**
                 * Creates a plain object from an Abort message. Also converts values to other types if specified.
                 * @param message Abort
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: tango.signaling.Packet.Abort, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Abort to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Abort
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            namespace Abort {

                /** Reason enum. */
                enum Reason {
                    REASON_UNKNOWN = 0,
                    REASON_PROTOCOL_VERSION_TOO_OLD = 1,
                    REASON_PROTOCOL_VERSION_TOO_NEW = 2,
                    REASON_MISSING_SESSION_ID = 3,
                    REASON_NOT_UPGRADE = 4
                }
            }
        }
    }
}
