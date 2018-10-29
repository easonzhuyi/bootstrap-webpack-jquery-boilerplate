import 'bootstrap';

import '~/scss/index/index.scss';

import store from '~/store';

const formMap = {
  insured: {
    trial: {
      form1: {
        relation: {
          value: '00',
          index: 0,
          rules: {
            label: '与您的关系',
            type: 'za-select',
            vRules: 'required',
            placeholder: '请选择',
            errorMsg: '请选择与投保人的关系',
            showName: true,
            options: [
              [
                { name: '本人', value: '00' },
                { name: '配偶', value: '01' },
                { name: '子女', value: '02' },
                { name: '父母', value: '03' },
                { name: '其他', value: '06' },
              ],
            ],
          },
        },
        birthday: {
          value: '2018-10-29',
          index: 1,
          rules: {
            label: '出生日期',
            type: 'za-date',
            vRules: 'required',
            placeholder: '请选择',
            errorMsg: '请输入出生日期',
          },
          validators: [],
        },
        genderCode: {
          value: 'M',
          index: 2,
          rules: {
            label: '性别',
            type: 'za-sex',
            vRules: 'required',
            placeholder: '请选择',
            errorMsg: '请选择性别',
          },
        },
        occupation: {
          value: '1',
          index: 4,
          rules: {
            label: '所属行业',
            type: 'za-select',
            vRules: 'required',
            placeholder: '请选择所属行业',
            showName: true,
            errorMsg: '请选择所属行业',
            options: [
              [{ value: '1', name: '职业1' }, { value: '2', name: '职业2' }],
            ],
          },
        },
        text: {
          index: 5,
          rules: {
            label: '保险责任',
            type: 'za-text',
          },
        },
        hasSocialSecurity: {
          value: '1',
          index: 3,
          rules: {
            label: '是否有社保',
            type: 'za-button_group',
            vRules: 'required',
            options: [{ name: '有', value: '1' }, { name: '无', value: '0' }],
          },
        },
        trainCoverage: {
          value: 1,
          index: 6,
          rules: {
            label: '火车意外身故/伤残（10万/份）',
            type: 'za-number',
            vRules: 'required',
            max: 10,
            min: 0,
            errorMsg: '请选择火车意外身故/伤残保险份数',
          },
        },
        planeCoverage: {
          value: '1',
          index: 7,
          rules: {
            label: '飞机意外身故/伤残',
            type: 'za-select',
            vRules: 'required',
            placeholder: '请选择',
            showName: true,
            errorMsg: '请选择飞机意外身故/伤残保额',
            options: [
              [
                { value: '1', name: '10万' },
                { value: '2', name: '20万' },
                { value: '2', name: '30万' },
              ],
            ],
          },
        },
        accidentNum: {
          value: 10,
          index: 8,
          rules: {
            label: '意外身故/伤残',
            type: 'za-number',
            vRules: 'required',
            max: 100,
            min: 0,
            step: 10,
            errorMsg: '请选择意外身故/伤残保险份数',
          },
        },
        accidentCoverage: {
          value: '1',
          index: 9,
          rules: {
            label: '意外保障',
            type: 'za-select',
            vRules: 'required',
            placeholder: '请选择',
            showName: true,
            errorMsg: '请选择飞机意外身故/伤残保额',
            options: [
              [
                { value: '1', name: '10万' },
                { value: '2', name: '20万' },
                { value: '2', name: '30万' },
              ],
            ],
          },
        },
        proCoverage: {
          value: 2,
          index: 10,
          rules: {
            label: '高端医疗保障（3000元/天/份）',
            type: 'za-number',
            vRules: 'required',
            max: 10,
            min: 0,
            errorMsg: '请选择高端医疗保障份数',
          },
        },
      },
    },
  },
  selfInfo: {
    // custId: '111',
    selfInfo: {
      form1: {
        title: {
          index: 0,
          rules: {
            label: '您的信息',
            type: 'za-text',
          },
        },
        name: {
          index: 1,
          value: '张小五',
          rules: {
            label: '姓名',
            type: 'za-input',
            vRules: 'required|cnname',
            placeholder: '请输入',
            readOnly: true,
            errorMsg: '请输入姓名',
          },
        },
        certType: {
          value: '00',
          index: 2,
          rules: {
            label: '证件类型',
            type: 'za-select',
            vRules: 'required',
            placeholder: '请选择',
            readOnly: true,
            showName: true,
            errorMsg: '请选择证件类型',
            options: [
              [
                { name: '身份证', value: '00' },
                { name: '护照', value: '01' },
                { name: '回乡证', value: '02' },
                { name: '军官证', value: '03' },
              ],
            ],
          },
        },
        idCard: {
          value: '110101199003074792',
          index: 3,
          rules: {
            label: '证件号码',
            type: 'za-input',
            readOnly: true,
            vRules: 'required|idcard',
            placeholder: '请输入身份证号码',
            errorMsg: '请输入身份证号码',
          },
          fillers: [
            {
              name: '自动填写生日',
              target: 'birthday',
              codes: `
                  return $$(0).substr(6, 4) + '-' + $$(0).substr(10, 2) + '-' + $$(0).substr(12, 2);
                `,
            },
          ],
        },
        certiDate: {
          value: '2025-04-05',
          index: 4,
          rules: {
            label: '证件有效期',
            type: 'za-date',
            vRules: 'required',
            readOnly: true,
            showExtBtn: true,
            txt: '长期',
            isLong: true,
            placeholder: '请选择',
            errorMsg: '请输入证件有效期',
          },
        },
        birthday: {
          value: '1990-03-07',
          index: 5,
          rules: {
            label: '出生日期',
            type: 'za-date',
            vRules: 'required',
            readOnly: true,
            placeholder: '请选择',
            errorMsg: '请输入出生日期',
          },
          validators: [],
        },
        genderCode: {
          value: 'M',
          index: 6,
          rules: {
            label: '性别',
            type: 'za-sex',
            vRules: 'required',
            readOnly: true,
            placeholder: '请选择',
            errorMsg: '请选择性别',
          },
        },
        mobile: {
          value: '13872837123',
          index: 7,
          rules: {
            label: '手机号码',
            type: 'za-input',
            readOnly: true,
            vRules: 'required|mobile',
            placeholder: '请输入手机号码',
            errorMsg: '请输入正确的手机号码',
          },
        },
        email: {
          value: 'zhangxiaowu@zhongan.io',
          index: 7,
          rules: {
            label: '电子邮箱',
            type: 'za-input',
            readOnly: true,
            vRules: 'required|email',
            placeholder: '请输入电子邮箱',
            errorMsg: '请输入正确的电子邮箱',
          },
        },
        nation: {
          value: '中国',
          index: 7,
          rules: {
            label: '国籍/地区',
            type: 'za-search',
            vRules: 'required',
            placeholder: '请选择',
            readOnly: true,
            errorMsg: '请选择国籍/地区',
            dataType: 'country',
          },
        },
      },
      form2: {
        title: {
          index: 0,
          rules: {
            label: '您的信息',
            type: 'za-text',
          },
        },
        name: {
          index: 1,
          value: '张小五',
          rules: {
            label: '姓名',
            type: 'za-input',
            vRules: 'required|cnname',
            placeholder: '请输入',
            readOnly: true,
            errorMsg: '请输入姓名',
          },
        },
        certType: {
          value: '00',
          index: 2,
          rules: {
            label: '证件类型',
            type: 'za-select',
            vRules: 'required',
            placeholder: '请选择',
            readOnly: true,
            showName: true,
            errorMsg: '请选择证件类型',
            options: [
              [
                { name: '身份证', value: '00' },
                { name: '护照', value: '01' },
                { name: '回乡证', value: '02' },
                { name: '军官证', value: '03' },
              ],
            ],
          },
        },
        idCard: {
          value: '110101199003074792',
          index: 3,
          rules: {
            label: '证件号码',
            type: 'za-input',
            readOnly: true,
            vRules: 'required|idcard',
            placeholder: '请输入身份证号码',
            errorMsg: '请输入身份证号码',
          },
          fillers: [
            {
              name: '自动填写生日',
              target: 'birthday',
              codes: `
                  return $$(0).substr(6, 4) + '-' + $$(0).substr(10, 2) + '-' + $$(0).substr(12, 2);
                `,
            },
          ],
        },
        certiDate: {
          value: '2025-04-05',
          index: 4,
          rules: {
            label: '证件有效期',
            type: 'za-date',
            vRules: 'required',
            readOnly: true,
            showExtBtn: true,
            txt: '长期',
            isLong: true,
            placeholder: '请选择',
            errorMsg: '请输入证件有效期',
          },
        },
        birthday: {
          value: '1990-03-07',
          index: 5,
          rules: {
            label: '出生日期',
            type: 'za-date',
            vRules: 'required',
            readOnly: true,
            placeholder: '请选择',
            errorMsg: '请输入出生日期',
          },
          validators: [],
        },
        genderCode: {
          value: 'M',
          index: 6,
          rules: {
            label: '性别',
            type: 'za-sex',
            vRules: 'required',
            readOnly: true,
            placeholder: '请选择',
            errorMsg: '请选择性别',
          },
        },
        mobile: {
          value: '13872837123',
          index: 7,
          rules: {
            label: '手机号码',
            type: 'za-input',
            readOnly: true,
            vRules: 'required|mobile',
            placeholder: '请输入手机号码',
            errorMsg: '请输入正确的手机号码',
          },
        },
        email: {
          value: 'zhangxiaowu@zhongan.io',
          index: 7,
          rules: {
            label: '电子邮箱',
            type: 'za-input',
            readOnly: true,
            vRules: 'required|email',
            placeholder: '请输入电子邮箱',
            errorMsg: '请输入正确的电子邮箱',
          },
        },
        nation: {
          value: '中国',
          index: 7,
          rules: {
            label: '国籍/地区',
            type: 'za-search',
            dataType: 'country',
            vRules: 'required',
            placeholder: '请选择',
            readOnly: true,
            errorMsg: '请选择国籍/地区',
          },
        },
      },
    },
  },
  addMember: {
    addMember: {
      form1: {
        // profession: {
        //   value: '00',
        //   index: 12,
        //   rules: {
        //     label: '所属行业',
        //     type: 'za-select',
        //     vRules: 'required',
        //     placeholder: '请选择所属行业',
        //     showName: true,
        //     errorMsg: '请选择所属行业',
        //     options: [[
        //       { name: '商业', value: '00' },
        //       { name: '农业', value: '01' }
        //     ]]
        //   }
        // },
        insurance: {
          value: '选择您的保险责任',
          index: 0,
          rules: {
            label: '保险责任',
            type: 'za-link',
            vRules: 'required',
            errorMsg: '选择您的保险责任',
          },
        },
        relation: {
          value: '00',
          index: 0,
          rules: {
            label: '与您的关系',
            type: 'za-select',
            vRules: 'required',
            placeholder: '与您的关系',
            errorMsg: '请选择与投保人的关系',
            showName: true,
            options: [
              [
                { name: '本人', value: '00' },
                { name: '配偶', value: '01' },
                { name: '子女', value: '02' },
                { name: '父母', value: '03' },
                { name: '其他', value: '06' },
              ],
            ],
          },
        },
        married: {
          value: '01',
          index: 1,
          rules: {
            label: '婚姻状况',
            type: 'za-select',
            vRules: 'required',
            placeholder: '请选择婚姻状况',
            errorMsg: '请选择婚姻状况',
            showName: true,
            options: [
              [
                { name: '未婚', value: '00' },
                { name: '已婚', value: '01' },
                { name: '丧偶', value: '02' },
                { name: '离婚', value: '03' },
              ],
            ],
          },
        },
        name: {
          index: 2,
          value: '张小五',
          rules: {
            label: '姓名',
            type: 'za-input',
            vRules: 'required|cnname',
            placeholder: '请输入',
            errorMsg: '请输入姓名',
          },
        },
        certType: {
          value: '00',
          index: 3,
          rules: {
            label: '证件类型',
            type: 'za-select',
            vRules: 'required',
            placeholder: '请选择证件类型',
            showName: true,
            errorMsg: '请选择证件类型',
            options: [
              [
                { name: '身份证', value: '00' },
                { name: '护照', value: '01' },
                { name: '回乡证', value: '02' },
                { name: '军官证', value: '03' },
              ],
            ],
          },
        },
        idCard: {
          value: '110101199003074792',
          index: 4,
          rules: {
            label: '证件号码',
            type: 'za-input',
            vRules: 'required|idcard',
            placeholder: '请输入身份证号码',
            errorMsg: '请输入身份证号码',
          },
          fillers: [
            {
              name: '自动填写生日',
              target: 'birthday',
              codes: `
                  return $$(0).substr(6, 4) + '-' + $$(0).substr(10, 2) + '-' + $$(0).substr(12, 2);
                `,
            },
          ],
        },
        certiDate: {
          value: '2025-04-05',
          index: 5,
          rules: {
            label: '证件有效期',
            type: 'za-date',
            vRules: 'required',
            showExtBtn: false,
            txt: '长期',
            isLong: false,
            placeholder: '请选择',
            errorMsg: '请输入证件有效期',
          },
        },
        genderCode: {
          value: 'M',
          index: 6,
          rules: {
            label: '性别',
            type: 'za-sex',
            vRules: 'required',
            placeholder: '请选择',
            errorMsg: '请选择性别',
          },
        },
        birthday: {
          value: '1990-03-07',
          index: 7,
          rules: {
            label: '出生日期',
            type: 'za-date',
            vRules: 'required',
            placeholder: '请选择',
            errorMsg: '请输入出生日期',
          },
          validators: [],
        },
        mobile: {
          value: '13872837123',
          index: 8,
          rules: {
            label: '手机号码',
            type: 'za-input',
            vRules: 'required|mobile',
            placeholder: '请输入手机号码',
            errorMsg: '请输入正确的手机号码',
          },
        },
        nation: {
          value: '中国',
          index: 9,
          rules: {
            label: '国籍/地区',
            type: 'za-search',
            vRules: 'required',
            dataType: 'country',
            placeholder: '请选择',
            errorMsg: '请选择国籍/地区',
          },
        },
        hasSocialSecurity: {
          value: '1',
          index: 10,
          rules: {
            label: '是否有社保',
            type: 'za-button_group',
            vRules: 'required',
            options: [{ name: '有', value: '1' }, { name: '无', value: '0' }],
          },
        },
        email: {
          value: 'zhangxiaowu@zhongan.io',
          index: 11,
          rules: {
            label: '电子邮箱',
            type: 'za-input',
            vRules: 'required|email',
            placeholder: '请输入电子邮箱',
            errorMsg: '请输入正确的电子邮箱',
          },
        },
      },
      form2: {
        title: {
          index: 0,
          rules: {
            label: '您的信息',
            type: 'za-text',
          },
        },
        name: {
          index: 1,
          value: '张小五',
          rules: {
            label: '姓名',
            type: 'za-input',
            vRules: 'required|cnname',
            placeholder: '请输入',
            readOnly: true,
            errorMsg: '请输入姓名',
          },
        },
        certType: {
          value: '00',
          index: 2,
          rules: {
            label: '证件类型',
            type: 'za-select',
            vRules: 'required',
            placeholder: '请选择',
            readOnly: true,
            showName: true,
            errorMsg: '请选择证件类型',
            options: [
              [
                { name: '身份证', value: '00' },
                { name: '护照', value: '01' },
                { name: '回乡证', value: '02' },
                { name: '军官证', value: '03' },
              ],
            ],
          },
        },
        idCard: {
          value: '110101199003074792',
          index: 3,
          rules: {
            label: '证件号码',
            type: 'za-input',
            readOnly: true,
            vRules: 'required|idcard',
            placeholder: '请输入身份证号码',
            errorMsg: '请输入身份证号码',
          },
          fillers: [
            {
              name: '自动填写生日',
              target: 'birthday',
              codes: `
                  return $$(0).substr(6, 4) + '-' + $$(0).substr(10, 2) + '-' + $$(0).substr(12, 2);
                `,
            },
          ],
        },
        certiDate: {
          value: '2025-04-05',
          index: 4,
          rules: {
            label: '证件有效期',
            type: 'za-date',
            vRules: 'required',
            readOnly: true,
            showExtBtn: true,
            txt: '长期',
            isLong: true,
            placeholder: '请选择',
            errorMsg: '请输入证件有效期',
          },
        },
        birthday: {
          value: '1990-03-07',
          index: 5,
          rules: {
            label: '出生日期',
            type: 'za-date',
            vRules: 'required',
            readOnly: true,
            placeholder: '请选择',
            errorMsg: '请输入出生日期',
          },
          validators: [],
        },
        genderCode: {
          value: 'M',
          index: 6,
          rules: {
            label: '性别',
            type: 'za-sex',
            vRules: 'required',
            readOnly: true,
            placeholder: '请选择',
            errorMsg: '请选择性别',
          },
        },
        mobile: {
          value: '13872837123',
          index: 7,
          rules: {
            label: '手机号码',
            type: 'za-input',
            readOnly: true,
            vRules: 'required|mobile',
            placeholder: '请输入手机号码',
            errorMsg: '请输入正确的手机号码',
          },
        },
        email: {
          value: 'zhangxiaowu@zhongan.io',
          index: 7,
          rules: {
            label: '电子邮箱',
            type: 'za-input',
            readOnly: true,
            vRules: 'required|email',
            placeholder: '请输入电子邮箱',
            errorMsg: '请输入正确的电子邮箱',
          },
        },
      },
      blankForm: {
        // profession: {
        //   value: '00',
        //   index: 12,
        //   rules: {
        //     label: '所属行业',
        //     type: 'za-select',
        //     showName: true,
        //     vRules: 'required',
        //     placeholder: '请选择所属行业',
        //     errorMsg: '请选择所属行业',
        //     options: [[
        //       { name: '商业', value: '00' },
        //       { name: '农业', value: '01' }
        //     ]]
        //   }
        // },
        insurance: {
          value: '选择您的保险责任',
          index: 0,
          rules: {
            label: '保险责任',
            type: 'za-link',
            vRules: 'required',
            errorMsg: '选择您的保险责任',
          },
        },
        relation: {
          value: '',
          index: 0,
          rules: {
            label: '与您的关系',
            type: 'za-select',
            vRules: 'required',
            placeholder: '与您的关系',
            errorMsg: '请选择与投保人的关系',
            showName: true,
            options: [
              [
                { name: '本人', value: '00' },
                { name: '配偶', value: '01' },
                { name: '子女', value: '02' },
                { name: '父母', value: '03' },
                { name: '其他', value: '06' },
              ],
            ],
          },
        },
        married: {
          value: '',
          index: 1,
          rules: {
            label: '婚姻状况',
            type: 'za-select',
            vRules: 'required',
            placeholder: '请选择婚姻状况',
            errorMsg: '请选择婚姻状况',
            showName: true,
            options: [
              [
                { name: '未婚', value: '00' },
                { name: '已婚', value: '01' },
                { name: '丧偶', value: '02' },
                { name: '离婚', value: '03' },
              ],
            ],
          },
        },
        name: {
          index: 2,
          value: '',
          rules: {
            label: '姓名',
            type: 'za-input',
            vRules: 'required|cnname',
            placeholder: '请输入',
            errorMsg: '请输入姓名',
          },
        },
        certType: {
          value: '',
          index: 3,
          rules: {
            label: '证件类型',
            type: 'za-select',
            vRules: 'required',
            placeholder: '请选择证件类型',
            showName: true,
            errorMsg: '请选择证件类型',
            options: [
              [
                { name: '身份证', value: '00' },
                { name: '护照', value: '01' },
                { name: '回乡证', value: '02' },
                { name: '军官证', value: '03' },
              ],
            ],
          },
          displayers: [
            {
              name: '显示身份证/护照输入框',
              fields: ['idCard'],
              codes: `
                  if($$(0) == '00') {
                    return [$$.comp(1, {vRules: 'required|idcard'})]
                  } else if($$(0) == '01') {
                    return [$$.comp(1, {vRules: 'required|passport'})]
                  } else {
                    return [$$.comp(1, {vRules: 'required'})]
                  }
                `,
            },
          ],
        },
        idCard: {
          value: '',
          index: 4,
          rules: {
            label: '证件号码',
            type: 'za-input',
            vRules: 'required|idcard',
            placeholder: '请输入证件号码',
            errorMsg: '请输入证件号码',
          },
          fillers: [
            {
              name: '自动填写生日',
              target: 'birthday',
              fields: ['certType'],
              codes: `
                  if($$(1) === '00') {
                    return $$(0).substr(6, 4) + '-' + $$(0).substr(10, 2) + '-' + $$(0).substr(12, 2);
                  }
                `,
            },
            {
              name: '自动填写性别',
              target: 'genderCode',
              fields: ['certType'],
              codes: `
                  if($$(1) === '00') {
                    return $$(0).substr(14, 1) % 2 === 0 ? 'F' : 'M';
                  }
                `,
            },
          ],
        },
        certiDate: {
          value: '',
          index: 5,
          rules: {
            label: '证件有效期',
            type: 'za-date',
            vRules: 'required',
            showExtBtn: false,
            txt: '长期',
            isLong: false,
            placeholder: '请选择',
            errorMsg: '请输入证件有效期',
          },
        },
        genderCode: {
          value: '',
          index: 6,
          rules: {
            label: '性别',
            type: 'za-sex',
            vRules: 'required',
            placeholder: '请选择',
            errorMsg: '请选择性别',
          },
        },
        birthday: {
          value: '',
          index: 7,
          rules: {
            label: '出生日期',
            type: 'za-date',
            vRules: 'required',
            placeholder: '请选择',
            errorMsg: '请输入出生日期',
          },
          validators: [],
        },
        mobile: {
          value: '',
          index: 8,
          rules: {
            label: '手机号码',
            type: 'za-input',
            vRules: 'required|mobile',
            placeholder: '请输入手机号码',
            errorMsg: '请输入正确的手机号码',
          },
        },
        nation: {
          value: '',
          index: 9,
          rules: {
            label: '国籍/地区',
            dataType: 'country',
            type: 'za-search',
            vRules: 'required',
            placeholder: '请选择国籍/地区',
            errorMsg: '请选择国籍/地区',
          },
        },
        hasSocialSecurity: {
          value: '',
          index: 10,
          rules: {
            label: '是否有社保',
            type: 'za-button_group',
            vRules: 'required',
            options: [{ name: '有', value: '1' }, { name: '无', value: '0' }],
          },
        },
        email: {
          value: '',
          index: 11,
          rules: {
            label: '电子邮箱',
            type: 'za-input',
            vRules: 'email',
            placeholder: '非必填',
            errorMsg: '请输入正确的电子邮箱',
          },
        },
      },
    },
  },
};

var form = new Vue({
  el: '#form',
  template: `
      <div>
        <p>{{pageName}} this is a vform</p>
        <form-unit :page="pageName" :name="fn" :formModels="formModels[pageName][fn]" @formChange="onChange" @formEvent="onEvent">
        </form-unit>
      </div>
  `,
  data() {
    return {
      pageName: 'trial',
      fn: 'form1',
      modelName: [],
      copyForm: 'form1',
      packageId: '1',
      price: {},
      errorBag: [],
      maxNum: null,
      isShowCompany: 'Y',
    };
  },
  mounted() {
    console.log('store', store);
    store.dispatch('setFormModels', { data: formMap.insured });
  },
  computed: {
    // ...mapGetters([
    //   'formModels'
    // ]),
    formModels() {
      // return formMap.insured;
      return store.getters.formModels;
    },
    count() {
      return store.state.count;
    },
  },
  methods: {
    onEvent(t, v) {
      console.warn(t, 'trigger: onEvent', v);
    },
    onItemClick() {},
    onCheck(v) {
      console.log(v);
    },
    onChange(v) {
      console.warn('trigger: formChange::', v);
    },
    showConfirm() {
      this.$vux.confirm.show({
        title: 'Title',
        content: 'Content',
        confirmText: 'xxxxx',
      });
    },
  },
  watch: {
    count(newValue) {
      console.log('------newValue', newValue);
    },
  },
});

$('#alert').click(() => {
  alert('index');
});

// Your jQuery code
