import { createGlobalStyle } from 'styled-components';

const FontsStyle = createGlobalStyle`
  @charset "UTF-8";
  :root {
    /* 폰트 size */
    --font12: 0.75rem;
    --font14: 0.875rem;
    --font16: 1rem;
    --font18: 1.125rem;
    --font20: 1.25rem;
    --font22: 1.375rem;
    --font24: 1.5rem;
    --font26: 1.625rem;
    --font28: 1.75rem;
    --font30: 1.875rem;
    --font32: 2rem;
    --font34: 2.125rem;
    --font36: 2.25rem;
    --font38: 2.375rem;
    --font40: 2.5rem;

    /* 폰트 weight */
    --font-w-b: 600;
    --font-w-m: 500;
    --font-w-r: 400;
    --font-w-l: 300;

    --dim: rgba(0, 0, 0, 0.5);
    --white-dim: rgba(255, 255, 255, 0.5);
    --active: #005EFF;
    --red: #FF0000;
    --white: #FFFFFF;

    /** 기본 색상 **/
    --primary: #005EFF;
    --secondary: #D9E6FF;
    --thirdary: #6A7685;

    --gray-primary: #F1F1F1;
    --gray-secondary: #EFF1F5;
    --gray-thirdary: #F4F6F8;
    --color-75: #757575;
    --color-f8: #F8F8F8;


    --color-2: #222222;
    --color-3: #333333;
    --color-6d: #6D6D6D;
    
    --color-ac: #ACBACF;

    --outline: #3ca7ff;
    --error: var(--red);

    /* 필수 정보 */
    --info-color: var(--color-6d);
    /* 아이콘 색상 */
    --ipt-clear: var(--color-c);
    --ipt-search:var(--color-9);
    --ipt-file: var(--color-9);
    --ipt-date: var(--color-9);

    /* 버튼 */
    --btn-disabled: var(--gray-primary);
    --btn-txt-disabled: var(--color-ab);
    --btn-primary: var(--primary);
    --btn-secondary: var(--secondary);
  
    /* 폼_인풋 */
    --ipt-label: var(--color-3);
    --ipt-txt: var(--secondary);
    --ipt-txt-active: var(--color-2);

    /* 팝업 색상 */
    --popup-txt: var(--color-2);
    --popup-sub-txt: var(--color-6d);
    }
`;

export default FontsStyle;
