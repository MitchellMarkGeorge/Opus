import styled from "styled-components";

interface Props {
    size: string;
}

export const GeneralIconContainer = styled.div<Props>`
    height: ${(props) => props.size};
    width: ${(props) => props.size};
    &:hover {
        filter: brightness(0.7);
    }

    &:active {
        filter: brightness(0.6);
    }

`;