export const buildMagickInterface = (
    initialGameState,
    overrides = {}
  ) => {
    // eslint-disable-next-line functional/no-let
    let gameState = { ...initialGameState }
  
    return {
      runSpell: async (flattenedInputs, spellId, state) => {
        throw new Error('Not implemented')
      },
      completion: async (body) => {
        throw new Error('Not implemented')
      },
      getSpell: async spellJson => {
        // try to find a .spell.json file in the root folder
        
        const spell = JSON.parse(spellJson)
        if(spell) {
          // spell.graph, spell.modules and spell.gameState are all JSON
          // parse them back into the object before returning it
          spell.graph = JSON.parse(spell.graph)
          spell.modules = JSON.parse(spell.modules)
          spell.gameState = JSON.parse(spell.gameState)
        }
        return spell
      },
      queryGoogle: async query => {
        throw new Error('Not implemented')
      },
      processCode: (
        code,
        inputs,
        data,
        state
      ) => {
        throw new Error('Not implemented')
      },
      setCurrentGameState: state => {
        gameState = state
      },
      getCurrentGameState: () => {
        return gameState
      },
      updateCurrentGameState: (update) => {
        const newState = {
          ...gameState,
          ...update,
        }
  
        gameState = newState
      },
      // IMPLEMENT THESE INTERFACES FOR THE SERVERbuildMagickInterface
      getEvent: async (args) => {
        throw new Error('Not implemented')
      },
      storeEvent: async (args) => {
        throw new Error('Not implemented')
      },
      getWikipediaSummary: async (keyword) => {
        throw new Error;
      },
    }
  }
  