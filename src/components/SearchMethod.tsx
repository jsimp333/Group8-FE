import Avatar from "@mui/material/Avatar";

export default function SearchMethod({ method }: { method: string }) {
  return (
    <Avatar variant="rounded">
      {method}
    </Avatar>
  );
}
