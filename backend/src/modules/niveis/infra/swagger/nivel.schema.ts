export const CreateNivelRequestSchema = {
  type: "object",
  properties: {
    nivel: {
      type: "string",
      example: "Sênior"
    }
  }
}

export const UpdateNivelRequestSchema = {
  type: "object",
  properties: {
    nivel: {
      type: "string",
      example: "Sênior"
    }
  }
}

export const NivelSchema = {
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