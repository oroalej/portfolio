"use client";

import { Button, CardHeader, CardRoot, CardTitle } from "@/components";
import { GoFileDirectoryFill } from "react-icons/go";
import { InputField } from "@/components/Form/InputField";
import { RiSearch2Line } from "react-icons/ri";
import { ProjectTypeSelect } from "@/app/admin/(modules)/projects/_components/Select/ProjectTypeSelect";
import { useQueryState } from "next-usequerystate";
import { useState } from "react";

const IndexProjectHeader = () => {
  const [type, setType] = useQueryState("type", {
    history: "push",
  });

  const [_, setQ] = useQueryState("q");
  const [search, setSearch] = useState("");

  return (
    <CardRoot rounded className="mb-4">
      <CardHeader className="flex justify-between">
        <CardTitle icon={<GoFileDirectoryFill />}>Projects</CardTitle>

        <div className="flex gap-3">
          <InputField
            placeholder="Search.."
            prependIcon={RiSearch2Line}
            value={search ?? undefined}
            onChange={(event) => setSearch(event.target.value)}
            onBlur={(event) => setQ(event.target.value)}
            onKeyPress={async (event) => {
              if (event.key.toLowerCase() === "enter") {
                await setQ(search);
              }
            }}
          />

          <div className="w-40">
            <ProjectTypeSelect
              onChange={async (value) => {
                await setType(value);
              }}
              value={type ?? ""}
              placeholder="Project Type"
            />
          </div>

          <Button rounded size="small" href="/admin/projects/create">
            Add New Dream
          </Button>
        </div>
      </CardHeader>
    </CardRoot>
  );
};

export default IndexProjectHeader;
