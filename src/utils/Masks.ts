/* eslint-disable no-throw-literal */
interface IMaskObj {
  conditional: boolean
  expr1: string
  expr2?:string
}

export default class Formatter {
  public static onlyDigits (input?: string) {
    if (!input) return ''
    return input.replace(/\D/g, '')
  }

  public static onlyStr (input?: string) {
    if (!input) return ''
    return input.replace(/[^\w]|\d/g, '')
  }

  private static renderTernary (conditional: boolean, expr1: string, expr2 = '') {
    return conditional ? expr1 : expr2
  }

  private static reduceList (list:IMaskObj[]) {
    return list.reduce((join:string, obj) => {
      join += this.renderTernary(obj.conditional, obj.expr1, obj.expr2)
      return join
    }, '')
  }

  public static cepMask (input?: string) {
    try {
      const value = this.onlyDigits(input || '').match(/(\d{1,5})(\d{0,3})/)
      if (typeof input !== 'string' || !value) throw ''
      return this.renderTernary(!value[2], value[1], `${value[1]}-${value[2]}`)
    } catch (error) {
      return ''
    }
  }

  public static cpfMask (input?: string) {
    try {
      const value = this.onlyDigits(input || '').match(/(\d{1,3})(\d{0,3})(\d{0,3})(\d{0,2})/)
      if (typeof input !== 'string' || !value) throw ''

      const listMask = [
        { conditional: !value[2], expr1: value[1], expr2: `${value[1]}.${value[2]}` },
        { conditional: !!value[3], expr1: `.${value[3]}` },
        { conditional: !!value[4], expr1: `-${value[4]}` }
      ]

      return this.reduceList(listMask)
    } catch (error) {
      return ''
    }
  }

  public static cnpjMask (input?: string) {
    try {
      const value = this.onlyDigits(String(input)).match(/(\d{1,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/)
      if (typeof input !== 'string' || !value) throw ''

      const listMask = [
        { conditional: !value[2], expr1: value[1], expr2: `${value[1]}.${value[2]}` },
        { conditional: !!value[3], expr1: `.${value[3]}` },
        { conditional: !!value[4], expr1: `/${value[4]}` },
        { conditional: !!value[5], expr1: `-${value[5]}` }
      ]

      return this.reduceList(listMask)
    } catch (error) {
      return ''
    }
  }

  public static cpfCnpjMask (input?: string) {
    if (!input) return ''
    if (this.onlyDigits(input).length <= 11) return this.cpfMask(input)
    return this.cnpjMask(input)
  }

  public static pisMask (input?: string) {
    try {
      const value = this.onlyDigits(input || '').match(/(\d{1,3})(\d{0,5})(\d{0,2})(\d{0,1})/)
      if (typeof input !== 'string' || !value) throw ''

      const listMask = [
        { conditional: !value[2], expr1: value[1], expr2: `${value[1]}.${value[2]}` },
        { conditional: !!value[3], expr1: `.${value[3]}` },
        { conditional: !!value[4], expr1: `-${value[4]}` }
      ]

      return this.reduceList(listMask)
    } catch (error) {
      return ''
    }
  }

  private static listPhoneMask (value: RegExpMatchArray) {
    return [
      { conditional: !value[2], expr1: value[1], expr2: `(${value[1]}) ${value[2]}` },
      { conditional: !!value[3], expr1: `-${value[3]}` }
    ]
  }

  public static phoneMask (input?: string) {
    if (!input) return ''

    input = this.onlyDigits(input)
    if (input.length <= 10) return this.landlinePhoneMask(input)
    return this.mobilePhoneMask(input)
  }

  public static mobilePhoneMask (input?: string) {
    try {
      const value = this.onlyDigits(String(input)).match(/^([0-9]{1,2})([0-9]{0,5})([0-9]{0,4})/)
      if (typeof input !== 'string' || !value) throw ''

      const listMask = this.listPhoneMask(value)
      return this.reduceList(listMask)
    } catch (error) {
      return ''
    }
  }

  public static landlinePhoneMask (input?: string) {
    try {
      const value = this.onlyDigits(String(input)).match(/^([0-9]{1,2})([0-9]{0,4})([0-9]{0,4})/)
      if (typeof input !== 'string' || !value) throw ''

      const listMask = this.listPhoneMask(value)
      return this.reduceList(listMask)
    } catch (error) {
      return ''
    }
  }

  private static formatValue (value: string) {
    if (value.length >= 2 && value[0] === '0') {
      value = value.slice(1, value.length)
    }

    if (value.length > 2) {
      let reg = '(\\d{2})'
      let groups = ''
      const qtd = Math.ceil((value.length - 2) / 3)
      for (let i = 0; i < qtd; i++) {
        groups += `$${i + 1}`
        if (i < qtd - 1) {
          reg = '(\\d{3})' + reg
          groups += '.'
        } else {
          reg = '(\\d{1,3})' + reg
        }
      }
      groups += `,$${qtd + 1}`
      const regExp = new RegExp(reg, 'g')
      value = value.replace(regExp, groups)
    }
    return value
  }

  public static moneyMask (value?: string) {
    try {
      if (typeof value !== 'string' || !value) throw ''

      value = this.onlyDigits(value).replace('R$ ', '')
      value = this.formatValue(value)

      return `R$ ${value}`
    } catch (error) {
      return ''
    }
  }

  public static percentMask (value?: string) {
    try {
      if (typeof value !== 'string' || !value) throw ''

      if (value.length > 1 && !value.includes('%')) {
        value = value.substring(0, value.length - 2)
      }

      value = this.onlyDigits(value).replace(' %', '')
      value = this.formatValue(value)

      return `${value} %`
    } catch (error) {
      return ''
    }
  }

  public static dateMask (input?: string) {
    try {
      const value = this.onlyDigits(String(input)).match(/(\d{1,2})(\d{0,2})(\d{0,4})/)
      if (typeof input !== 'string' || !value) throw ''

      const listMask = [
        { conditional: !value[2], expr1: value[1], expr2: `${value[1]}/${value[2]}` },
        { conditional: !!value[3], expr1: `/${value[3]}` }
      ]

      return this.reduceList(listMask)
    } catch (error) {
      return ''
    }
  }

  public static hourMask (input?: string) {
    try {
      const value = this.onlyDigits(String(input)).match(/(\d{1,2})(\d{0,2})/)
      if (typeof input !== 'string' || !value) throw ''

      const listMask = [
        { conditional: !value[2], expr1: `${value[1]}h`, expr2: `${value[1]}h${value[2]}` }
      ]

      return this.reduceList(listMask)
    } catch (error) {
      return ''
    }
  }

  public static dateHourMask (input?: string) {
    try {
      const value = this.onlyDigits(String(input)).match(/(\d{1,2})(\d{0,2})(\d{0,4})(\d{0,2})(\d{0,2})/)
      if (typeof input !== 'string' || !value) throw ''

      const listMask = [
        { conditional: !value[2], expr1: value[1], expr2: `${value[1]}/${value[2]}` },
        { conditional: !!value[3], expr1: `/${value[3]}` },
        { conditional: !!value[4], expr1: ` ${value[4]}h` },
        { conditional: !!value[5], expr1: `${value[5]}` }
      ]

      return this.reduceList(listMask)
    } catch (error) {
      return ''
    }
  }
}
