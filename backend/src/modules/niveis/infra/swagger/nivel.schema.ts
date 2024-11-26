export const CreateNivelRequestSchema = {
  type: "object",
  properties: {
    nivel: {
      type: "string",
      example: "Sênior"
    }
  }
}

export const CreateNivelResponseSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1
    },
    nivel: {
      type: "string",
      example: "Sênior"
    }
  }
}