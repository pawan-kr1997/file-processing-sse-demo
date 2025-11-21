import UploadFiles from "@/assets/uploadfiles.webp";
import { Box, FileUpload } from "@chakra-ui/react";
import "./dropzone.css";

interface DropzoneProps {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({
  selectedFile,
  setSelectedFile,
}) => {
  return (
    <FileUpload.Root
      alignItems="stretch"
      maxFiles={1}
      my={6}
      onFileAccept={(details) => {
        if (details.files.length > 0) {
          setSelectedFile(details.files[0]);
        }
      }}
      onFileReject={() => {
        setSelectedFile(null);
      }}
      accept={[
        "application/pdf",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ]}
    >
      <FileUpload.HiddenInput />
      <FileUpload.Dropzone className="dropzone">
        <img src={UploadFiles} alt="Upload Files" className="image-container" />
        <FileUpload.DropzoneContent alignItems={"flex-start"}>
          <Box>Drag and drop or click to upload a file</Box>
          <Box color="fg.muted">
            Supported formats: PDF, PPT, PPTX, PNG, JPG, JPEG
          </Box>
        </FileUpload.DropzoneContent>
      </FileUpload.Dropzone>
      <FileUpload.ItemGroup>
        <FileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file, index) => (
              <FileUpload.Item key={index} file={file}>
                <FileUpload.ItemPreview type="image/*">
                  <FileUpload.ItemPreviewImage />
                </FileUpload.ItemPreview>
                <FileUpload.ItemName />
                <FileUpload.ItemSizeText />
                <FileUpload.ItemDeleteTrigger />
              </FileUpload.Item>
            ))
          }
        </FileUpload.Context>
      </FileUpload.ItemGroup>
    </FileUpload.Root>
  );
};

export default Dropzone;
