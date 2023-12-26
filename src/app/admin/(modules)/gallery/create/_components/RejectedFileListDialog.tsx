import { Button, Card, Dialog, DialogProps, Scrollbar } from "@/components";
import { Fragment } from "react";
import { computeStorageSizeFromByte } from "@/utils";
import * as UIScrollArea from "@radix-ui/react-scroll-area";

export const DEFAULT_REJECT_FILES_VALUES: RejectedFiles = {
  size: [],
  type: [],
};

export interface RejectedFiles {
  size: File[];
  type: File[];
}

export interface RejectedFileListDialogProps extends DialogProps {
  items: RejectedFiles;
}

export const RejectedFileListDialog = ({
  isOpen,
  items,
  onClose,
}: RejectedFileListDialogProps) => (
  <Dialog isOpen={isOpen} onClose={onClose}>
    <Card className="max-w-xl mx-auto mt-10" rounded>
      <Card.Header className="pb-0">
        <Card.Title className="text-red-700">Reject Files</Card.Title>
      </Card.Header>
      <Card.Body>
        <UIScrollArea.Root type="auto">
          <UIScrollArea.Viewport className="max-h-96">
            {!!items.size.length && (
              <Fragment>
                <span className="block text-xs text-red-700 leading-snug mb-2">
                  {"Max size accepted: "}
                  <u className="underline-offset-2">
                    <b>15MB</b>
                  </u>
                </span>

                <div className="border border-red-200 rounded overflow-hidden text-red-700">
                  <table className="text-red-700">
                    <thead>
                      <tr className="bg-red-100">
                        <th className="py-1.5">File Name</th>
                        <th className="py-1.5 w-36">Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.size.map((file, index) => (
                        <tr key={`rejected-size-${file.size}-${index}`}>
                          <td className="py-1.5">{file.name}</td>
                          <td className="py-1.5 text-red-700 font-medium">
                            {computeStorageSizeFromByte(file.size)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Fragment>
            )}

            {!!items.type.length && (
              <Fragment>
                <span className="block text-xs text-red-700 leading-snug mb-2">
                  {"Only supported types: "}
                  <u className="underline-offset-2">
                    <b>JPG</b>, <b>JPEG</b>, <b>PNG</b>, and <b>WEBP</b>
                  </u>
                  .
                </span>
                <div className="border border-red-200 rounded overflow-hidden mb-4 text-red-700">
                  <table className="text-red-700">
                    <thead>
                      <tr className="bg-red-100">
                        <th className="py-1.5">File Name</th>
                        <th className="py-1.5 w-40">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.type.map((file, index) => (
                        <tr key={`rejected-type-${file.size}-${index}`}>
                          <td className="py-1.5 break-all">{file.name}</td>
                          <td className="py-1.5 text-red-700 font-medium">
                            {!!file.type ? file.type : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Fragment>
            )}
          </UIScrollArea.Viewport>
          <Scrollbar />
        </UIScrollArea.Root>
      </Card.Body>
      <Card.Footer className="justify-end pt-0">
        <Button color="secondary" rounded size="small" onClick={onClose}>
          Close
        </Button>
      </Card.Footer>
    </Card>
  </Dialog>
);
