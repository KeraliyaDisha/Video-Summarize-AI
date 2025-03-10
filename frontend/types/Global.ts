export interface SocialLink {
  id: number;
  text: string;
  url: string;
}

export interface FooterProps {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    };
    text: string;
    socialLink: SocialLink[];
  };
}

export interface HeaderProps {
  data: {
    logoText: {
      id: number;
      text: string;
      url: string;
    };
    ctaButton: {
      id: number;
      text: string;
      url: string;
    };
  };
}
