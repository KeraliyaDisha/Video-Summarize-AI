import Link from "next/link";
import { getUserMeLoader } from "@/data/services/getUserMeLoader";
import { Logo } from "@/components/global/Logo";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "../../Button/logOutButton";
import { HeaderProps } from "@/types/Global";
import { SummaryForm } from "@/components/forms/summaryForm";

interface AuthUserProps {
  username: string;
  email: string;
}

export function LoggedInUser({
  userData,
}: {
  readonly userData: AuthUserProps;
}) {
  return (
    <div className="flex gap-2">
      <Link
        href="/dashboard/account"
        className="font-semibold hover:text-primary"
      >
        {userData.username}
      </Link>
      <LogoutButton />
    </div>
  );
}

export async function Header({ data }: Readonly<HeaderProps>) {
  const { logoText, ctaButton } = data;
  const user = await getUserMeLoader();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
      <Logo text={logoText.text} />
      {user.ok && <SummaryForm/>}
      <div className="flex items-center gap-4">
        {user.ok ? (
          <LoggedInUser userData={user.data} />
        ) : (
          <Link href={ctaButton.url}>
            <Button>{ctaButton.text}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}