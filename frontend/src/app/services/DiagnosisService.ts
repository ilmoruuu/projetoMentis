import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export interface DiagnosisResponse {
  id: string;
  cid10Principal: string;
  cid10Secondary: string | null;
  observation: string;
}

/**
 * O back-end usa o enum Cid10. No JSON, o enum é representado pelo NOME
 * da constante (ex.: "F102"), e não pelo código com ponto exibido na tela
 * (ex.: "F10.2"). Este mapa traduz o código (UI) para o nome do enum
 * (back-end) e contém EXATAMENTE os CIDs suportados pelo back-end.
 */
const CID_CODE_TO_ENUM: Record<string, string> = {
  'F10.0': 'F100',
  'F10.1': 'F101',
  'F10.2': 'F102',
  'F11.0': 'F110',
  'F11.1': 'F111',
  'F11.2': 'F112',
  'F12.0': 'F120',
  'F12.1': 'F121',
  'F12.2': 'F122',
  'F13.0': 'F130',
  'F13.1': 'F131',
  'F13.2': 'F132',
  'F14.0': 'F140',
  'F14.1': 'F141',
  'F14.2': 'F142',
  'F15.0': 'F150',
  'F15.1': 'F151',
  'F15.2': 'F152',
  'F17.0': 'F170',
  'F17.1': 'F171',
  'F17.2': 'F172',
  'F20.0': 'F200',
  'F20.1': 'F201',
  'F31.0': 'F310',
  'F32.0': 'F320',
  'F32.1': 'F321',
  'F32.2': 'F322',
  'F40.0': 'F400',
  'F41.0': 'F410',
  'F41.1': 'F411',
  'F42.0': 'F420',
  'F43.1': 'F431',
  X65: 'X650',
  X66: 'X660',
  X68: 'X680',
};

/**
 * Traduz um código CID-10 (com ponto) para o nome do enum do back-end.
 * Lança erro com mensagem amigável se o código não for suportado.
 */
function cidEnumFromCode(code: string): string {
  const normalized = code.trim().toUpperCase();
  const enumName = CID_CODE_TO_ENUM[normalized];

  if (!enumName) {
    throw new Error(`O CID-10 "${code}" não é suportado pelo sistema.`);
  }

  return enumName;
}

/**
 * Cria um diagnóstico (CID-10 principal, secundário opcional e observação).
 * @param primaryCidCode  código do CID principal (obrigatório), ex.: "F10.2"
 * @param secondaryCidCode código do CID secundário (opcional), ex.: "F17.1"
 * @param observation observação clínica (CID ampliado)
 */
export async function createDiagnosis(
  primaryCidCode: string,
  secondaryCidCode: string,
  observation: string,
): Promise<DiagnosisResponse> {
  if (!primaryCidCode.trim()) {
    throw new Error('Informe o CID-10 principal.');
  }

  const cid10Principal = cidEnumFromCode(primaryCidCode);
  const cid10Secondary = secondaryCidCode.trim()
    ? cidEnumFromCode(secondaryCidCode)
    : null;

  try {
    const response = await axios.post(`${BASE_URL}/diagnosis`, {
      cid10Principal,
      cid10Secondary,
      observation: observation.trim(),
    });

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const mensagemErro =
        e.response?.data?.message || 'Não foi possível salvar o diagnóstico';

      throw new Error(mensagemErro);
    }

    throw new Error('Não foi possível conectar ao servidor, Tente novamente mais tarde');
  }
}
