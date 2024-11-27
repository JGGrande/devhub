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

export const FindAllNivelResponseSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 2
          },
          nivel: {
            type: 'string',
            example: 'Junior 1'
          }
        }
      }
    },
    meta: {
      type: 'object',
      properties: {
        total: {
          type: 'integer',
          example: 2
        },
        current_page: {
          type: 'integer',
          example: 1
        },
        per_page: {
          type: 'integer',
          example: 25
        },
        last_page: {
          type: 'integer',
          example: 1
        }
      }
    }
  }
}
