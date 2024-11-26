import Avatar from "@mui/material/Avatar";

export default function SearchMethod({ method }: { method: number }) {
  return (
    <Avatar variant="rounded">
      {method}
    </Avatar>
  );
}
