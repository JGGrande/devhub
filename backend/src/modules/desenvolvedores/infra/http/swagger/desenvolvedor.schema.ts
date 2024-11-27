export const CreateDesenvolvedorRequestSchema = {
  type: 'object',
  properties: {
    nome: {
      type: 'string',
      example: 'João Grande 2'
    },
    nivel_id: {
      type: 'integer',
      example: 37
    },
    data_nascimento: {
      type: 'string',
      format: 'date',
      example: '2004-12-18'
    },
    sexo: {
      type: 'string',
      enum: ['M', 'F', 'Outro'],
      example: 'M'
    },
    hobby: {
      type: 'string',
      example: 'Programação'
    }
  },
  required: ['nome', 'nivel_id', 'data_nascimento', 'sexo', 'hobby']
}

export const DesenvolvedorSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      example: 2
    },
    nome: {
      type: 'string',
      example: 'João Grande 2'
    },
    nivel_id: {
      type: 'integer',
      example: 37
    },
    data_nascimento: {
      type: 'string',
      format: 'date-time',
      example: '2004-12-18T00:00:00.000Z'
    },
    sexo: {
      type: 'string',
      enum: ['M', 'F', 'Outro'],
      example: 'M'
    },
    hobby: {
      type: 'string',
      example: 'Programação'
    }
  }
}

export const FindAllDesenvolvedorResponseSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1
          },
          nome: {
            type: 'string',
            example: 'João Grande'
          },
          sexo: {
            type: 'string',
            enum: ['M', 'F', 'Outro'],
            example: 'M'
          },
          data_nascimento: {
            type: 'string',
            format: 'date-time',
            example: "2004-12-18T00:00:00.000Z"
          },
          idade: {
            type: "integer",
            example: 19
          },
          hobby: {
            type: 'string',
            example: 'Programação'
          },
          nivel: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
                example: 37
              },
              nivel: {
                type: 'string',
                example: 'Pleno 1'
              }
            }
          }
        }
      }
    },
    meta: {
      type: 'object',
      properties: {
        total: {
          type: 'integer',
          example: 4
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
