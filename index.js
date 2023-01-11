const { SpellManager } = require("./magickml-core");
const { buildMagickInterface } = require ("./buildMagickInterface");
import json from './main.spell.json'

const spellManager = new SpellManager({
    magickInterface: buildMagickInterface({}),
    cache: false,
  })

const spell = JSON.parse(json)

if(!spell) {
    throw new Error(`No spell found at ${process.env.ROOT_SPELL}`)
}

async function handleRequest(request) {
    if (request.method === 'OPTIONS') {
        return handleOptions(request);
    } else {
        return handleFetch(request);
    }
}

async function handleResponse(data){
    const spellRunner = await spellManager.load(rootSpell)
    const spellOutputs = await spellRunner.defaultRun(data.inputs)
    return spellOutputs;
}

async function handleFetch(request) {
    // Extract the bearer token from the request headers
    const authorization = request.headers.get('Authorization');
    if (!authorization) {
        return new Response('Unauthorized', { status: 401 });
    }

    const data = await request.json();

    const response = await handleResponse(data);

    // Return the results to the client
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };
    return new Response(JSON.stringify({ response }), {
        headers
    });
}

function handleOptions(request) {
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    return new Response(null, { headers });
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
});
