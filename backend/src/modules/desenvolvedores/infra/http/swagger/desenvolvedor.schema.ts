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
