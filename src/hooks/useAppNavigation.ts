import { useNavigate } from "@solidjs/router";

export function useAppNavigation() {
  const navigate = useNavigate();

  return {
    toDetails(id: string | number, title: string) {
      navigate(`/${title.toLowerCase()}/details/${id}`);
    },
  };
}
