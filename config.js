System.config({
    "transpiler": "traceur",
    "paths": {
        "*": "*.js",
        "github:*": "jspm_packages/github/*.js",
        "npm:*": "jspm_packages/npm/*.js"
    }
});

System.config({
    "map": {
        "chai": "npm:chai@3.0.0",
        "crypto": "github:jspm/nodelibs-crypto@0.1.0",
        "crypto-browserify": "npm:crypto-browserify@3.9.14",
        "fetch": "github:github/fetch@0.9.0",
        "fs": "github:jspm/nodelibs-fs@0.1.2",
        "mocha": "npm:mocha@2.2.5",
        "path": "github:jspm/nodelibs-path@0.1.0",
        "samsam": "npm:samsam@1.1.2",
        "sinon": "npm:sinon@1.15.4",
        "systemjs": "npm:systemjs@0.18.4",
        "traceur": "github:jmcriffey/bower-traceur@0.0.88",
        "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
        "ws": "npm:ws@0.7.2",
        "github:jspm/nodelibs-assert@0.1.0": {
            "assert": "npm:assert@1.3.0"
        },
        "github:jspm/nodelibs-buffer@0.1.0": {
            "buffer": "npm:buffer@3.3.0"
        },
        "github:jspm/nodelibs-constants@0.1.0": {
            "constants-browserify": "npm:constants-browserify@0.0.1"
        },
        "github:jspm/nodelibs-crypto@0.1.0": {
            "crypto-browserify": "npm:crypto-browserify@3.9.14"
        },
        "github:jspm/nodelibs-events@0.1.1": {
            "events": "npm:events@1.0.2"
        },
        "github:jspm/nodelibs-http@1.7.1": {
            "Base64": "npm:Base64@0.2.1",
            "events": "github:jspm/nodelibs-events@0.1.1",
            "inherits": "npm:inherits@2.0.1",
            "stream": "github:jspm/nodelibs-stream@0.1.0",
            "url": "github:jspm/nodelibs-url@0.1.0",
            "util": "github:jspm/nodelibs-util@0.1.0"
        },
        "github:jspm/nodelibs-https@0.1.0": {
            "https-browserify": "npm:https-browserify@0.0.0"
        },
        "github:jspm/nodelibs-path@0.1.0": {
            "path-browserify": "npm:path-browserify@0.0.0"
        },
        "github:jspm/nodelibs-process@0.1.1": {
            "process": "npm:process@0.10.1"
        },
        "github:jspm/nodelibs-stream@0.1.0": {
            "stream-browserify": "npm:stream-browserify@1.0.0"
        },
        "github:jspm/nodelibs-url@0.1.0": {
            "url": "npm:url@0.10.3"
        },
        "github:jspm/nodelibs-util@0.1.0": {
            "util": "npm:util@0.10.3"
        },
        "github:jspm/nodelibs-vm@0.1.0": {
            "vm-browserify": "npm:vm-browserify@0.0.4"
        },
        "github:jspm/nodelibs-zlib@0.1.0": {
            "browserify-zlib": "npm:browserify-zlib@0.1.4"
        },
        "npm:asn1.js@2.1.0": {
            "assert": "github:jspm/nodelibs-assert@0.1.0",
            "bn.js": "npm:bn.js@2.1.0",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "inherits": "npm:inherits@2.0.1",
            "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
            "vm": "github:jspm/nodelibs-vm@0.1.0"
        },
        "npm:assert@1.3.0": {
            "util": "npm:util@0.10.3"
        },
        "npm:bindings@1.2.1": {
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "path": "github:jspm/nodelibs-path@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:browserify-aes@1.0.1": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "create-hash": "npm:create-hash@1.1.1",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "inherits": "npm:inherits@2.0.1",
            "stream": "github:jspm/nodelibs-stream@0.1.0",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:browserify-rsa@2.0.1": {
            "bn.js": "npm:bn.js@2.1.0",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "constants": "github:jspm/nodelibs-constants@0.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "randombytes": "npm:randombytes@2.0.1"
        },
        "npm:browserify-sign@3.0.2": {
            "bn.js": "npm:bn.js@2.1.0",
            "browserify-rsa": "npm:browserify-rsa@2.0.1",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "create-hash": "npm:create-hash@1.1.1",
            "create-hmac": "npm:create-hmac@1.1.3",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "elliptic": "npm:elliptic@3.1.0",
            "inherits": "npm:inherits@2.0.1",
            "parse-asn1": "npm:parse-asn1@3.0.1",
            "stream": "github:jspm/nodelibs-stream@0.1.0",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:browserify-zlib@0.1.4": {
            "assert": "github:jspm/nodelibs-assert@0.1.0",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "pako": "npm:pako@0.2.7",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "readable-stream": "npm:readable-stream@1.1.13",
            "util": "github:jspm/nodelibs-util@0.1.0"
        },
        "npm:buffer@3.2.2": {
            "base64-js": "npm:base64-js@0.0.8",
            "ieee754": "npm:ieee754@1.1.6",
            "is-array": "npm:is-array@1.0.1"
        },
        "npm:buffer@3.3.0": {
            "base64-js": "npm:base64-js@0.0.8",
            "ieee754": "npm:ieee754@1.1.6",
            "is-array": "npm:is-array@1.0.1"
        },
        "npm:bufferutil@1.1.0": {
            "bindings": "npm:bindings@1.2.1",
            "nan": "npm:nan@1.8.4"
        },
        "npm:chai@3.0.0": {
            "assertion-error": "npm:assertion-error@1.0.1",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "deep-eql": "npm:deep-eql@0.1.3",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0",
            "type-detect": "npm:type-detect@1.0.0"
        },
        "npm:constants-browserify@0.0.1": {
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:core-util-is@1.0.1": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0"
        },
        "npm:create-ecdh@2.0.1": {
            "bn.js": "npm:bn.js@2.1.0",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "elliptic": "npm:elliptic@3.1.0"
        },
        "npm:create-hash@1.1.1": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "inherits": "npm:inherits@2.0.1",
            "ripemd160": "npm:ripemd160@1.0.1",
            "sha.js": "npm:sha.js@2.4.2",
            "stream": "github:jspm/nodelibs-stream@0.1.0"
        },
        "npm:create-hmac@1.1.3": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "create-hash": "npm:create-hash@1.1.1",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "inherits": "npm:inherits@2.0.1",
            "stream": "github:jspm/nodelibs-stream@0.1.0"
        },
        "npm:crypto-browserify@3.9.14": {
            "browserify-aes": "npm:browserify-aes@1.0.1",
            "browserify-sign": "npm:browserify-sign@3.0.2",
            "create-ecdh": "npm:create-ecdh@2.0.1",
            "create-hash": "npm:create-hash@1.1.1",
            "create-hmac": "npm:create-hmac@1.1.3",
            "diffie-hellman": "npm:diffie-hellman@3.0.2",
            "inherits": "npm:inherits@2.0.1",
            "pbkdf2": "npm:pbkdf2@3.0.4",
            "public-encrypt": "npm:public-encrypt@2.0.1",
            "randombytes": "npm:randombytes@2.0.1"
        },
        "npm:deep-eql@0.1.3": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "type-detect": "npm:type-detect@0.1.1"
        },
        "npm:diffie-hellman@3.0.2": {
            "bn.js": "npm:bn.js@2.1.0",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "miller-rabin": "npm:miller-rabin@2.0.1",
            "randombytes": "npm:randombytes@2.0.1",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:elliptic@3.1.0": {
            "bn.js": "npm:bn.js@2.1.0",
            "brorand": "npm:brorand@1.0.5",
            "hash.js": "npm:hash.js@1.0.3",
            "inherits": "npm:inherits@2.0.1",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:es6-module-loader@0.17.3": {
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0",
            "util": "github:jspm/nodelibs-util@0.1.0",
            "when": "npm:when@3.7.3"
        },
        "npm:formatio@1.1.1": {
            "process": "github:jspm/nodelibs-process@0.1.1",
            "samsam": "npm:samsam@1.1.2"
        },
        "npm:hash.js@1.0.3": {
            "inherits": "npm:inherits@2.0.1"
        },
        "npm:https-browserify@0.0.0": {
            "http": "github:jspm/nodelibs-http@1.7.1"
        },
        "npm:inherits@2.0.1": {
            "util": "github:jspm/nodelibs-util@0.1.0"
        },
        "npm:miller-rabin@2.0.1": {
            "bn.js": "npm:bn.js@2.1.0",
            "brorand": "npm:brorand@1.0.5"
        },
        "npm:mocha@2.2.5": {
            "css": "github:systemjs/plugin-css@0.1.13"
        },
        "npm:nan@1.8.4": {
            "path": "github:jspm/nodelibs-path@0.1.0"
        },
        "npm:options@0.0.6": {
            "fs": "github:jspm/nodelibs-fs@0.1.2"
        },
        "npm:pako@0.2.7": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:parse-asn1@3.0.1": {
            "asn1.js": "npm:asn1.js@2.1.0",
            "browserify-aes": "npm:browserify-aes@1.0.1",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "create-hash": "npm:create-hash@1.1.1",
            "pbkdf2": "npm:pbkdf2@3.0.4",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:path-browserify@0.0.0": {
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:pbkdf2@3.0.4": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "child_process": "github:jspm/nodelibs-child_process@0.1.0",
            "create-hmac": "npm:create-hmac@1.1.3",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "path": "github:jspm/nodelibs-path@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "systemjs-json": "github:systemjs/plugin-json@0.1.0"
        },
        "npm:public-encrypt@2.0.1": {
            "bn.js": "npm:bn.js@2.1.0",
            "browserify-rsa": "npm:browserify-rsa@2.0.1",
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "create-hash": "npm:create-hash@1.1.1",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "parse-asn1": "npm:parse-asn1@3.0.1",
            "randombytes": "npm:randombytes@2.0.1"
        },
        "npm:punycode@1.3.2": {
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:randombytes@2.0.1": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:readable-stream@1.1.13": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "core-util-is": "npm:core-util-is@1.0.1",
            "events": "github:jspm/nodelibs-events@0.1.1",
            "inherits": "npm:inherits@2.0.1",
            "isarray": "npm:isarray@0.0.1",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "stream": "github:jspm/nodelibs-stream@0.1.0",
            "stream-browserify": "npm:stream-browserify@1.0.0",
            "string_decoder": "npm:string_decoder@0.10.31",
            "util": "github:jspm/nodelibs-util@0.1.0"
        },
        "npm:ripemd160@1.0.1": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:sha.js@2.4.2": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "inherits": "npm:inherits@2.0.1",
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:sinon@1.15.4": {
            "formatio": "npm:formatio@1.1.1",
            "lolex": "npm:lolex@1.1.0",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "samsam": "npm:samsam@1.1.2",
            "util": "npm:util@0.10.3"
        },
        "npm:stream-browserify@1.0.0": {
            "events": "github:jspm/nodelibs-events@0.1.1",
            "inherits": "npm:inherits@2.0.1",
            "readable-stream": "npm:readable-stream@1.1.13"
        },
        "npm:string_decoder@0.10.31": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0"
        },
        "npm:systemjs@0.18.4": {
            "es6-module-loader": "npm:es6-module-loader@0.17.3",
            "fs": "github:jspm/nodelibs-fs@0.1.2",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "when": "npm:when@3.7.3"
        },
        "npm:ultron@1.0.2": {
            "events": "github:jspm/nodelibs-events@0.1.1"
        },
        "npm:url@0.10.3": {
            "assert": "github:jspm/nodelibs-assert@0.1.0",
            "punycode": "npm:punycode@1.3.2",
            "querystring": "npm:querystring@0.2.0",
            "util": "github:jspm/nodelibs-util@0.1.0"
        },
        "npm:utf-8-validate@1.1.0": {
            "bindings": "npm:bindings@1.2.1",
            "nan": "npm:nan@1.8.4"
        },
        "npm:util@0.10.3": {
            "inherits": "npm:inherits@2.0.1",
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:vm-browserify@0.0.4": {
            "indexof": "npm:indexof@0.0.1"
        },
        "npm:when@3.7.3": {
            "process": "github:jspm/nodelibs-process@0.1.1"
        },
        "npm:ws@0.7.2": {
            "buffer": "github:jspm/nodelibs-buffer@0.1.0",
            "bufferutil": "npm:bufferutil@1.1.0",
            "crypto": "github:jspm/nodelibs-crypto@0.1.0",
            "events": "github:jspm/nodelibs-events@0.1.1",
            "http": "github:jspm/nodelibs-http@1.7.1",
            "https": "github:jspm/nodelibs-https@0.1.0",
            "options": "npm:options@0.0.6",
            "process": "github:jspm/nodelibs-process@0.1.1",
            "stream": "github:jspm/nodelibs-stream@0.1.0",
            "tls": "github:jspm/nodelibs-tls@0.1.0",
            "ultron": "npm:ultron@1.0.2",
            "url": "github:jspm/nodelibs-url@0.1.0",
            "utf-8-validate": "npm:utf-8-validate@1.1.0",
            "util": "github:jspm/nodelibs-util@0.1.0",
            "zlib": "github:jspm/nodelibs-zlib@0.1.0"
        }
    }
});
