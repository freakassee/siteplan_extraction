function process_image(image_file,X_transposed,Y_transposed,extractAll)

if nargin < 1
    error('input_example : An image-file must be specified')
end
if nargin < 2
    error('input_example : X is a required input')
end
if nargin < 3
    error('input_example : Y is a required input')
end
if nargin < 4
  extractAll = true;
end
fileSplit =  strsplit(image_file,'.');
extension = char(fileSplit(length(fileSplit)));
image_name  = strrep(image_file,['.' extension],'');


isError = false;

try 
    pathPublicImages = '../public/images/';
    pathFile = [pathPublicImages image_name '/'];
    pathData = [pathFile 'data/'];
    pathExtracted = [pathFile 'extracted/'];
    pathExtractedEmpty = [pathFile 'extracted/empty/'];
    pathExtractedSymbol = [pathFile 'extracted/symbol/'];
    pathTransformed = [pathFile 'transformed/'];
    
    
    mkdir(pathData);
    mkdir(pathExtracted);
    mkdir(pathTransformed);
    mkdir(pathExtractedEmpty);
    mkdir(pathExtractedSymbol);
    
catch exception
    isError = true;
	timeStamp = datetime('now');
	errorMessage = [datestr(timeStamp) , ' ERROR: ', exception.identifier,'. ImageId: ', image_file,' Detailed: ', exception.message,'\n'];
	errorFile=fopen('error.log','w');
	fprintf(errorFile, errorMessage);
	fclose(errorFile);
end

if ~isError

showImage = false;
targetFolder = '../uploads/';

    
    targetImageFile = strcat(targetFolder, image_file);
    input_image = imread(targetImageFile);
    
    

    X = X_transposed';
    Y = Y_transposed';
try 
    [output_image, margin_left, margin_top] = projective_transform(input_image, X,Y);
    
  
    imwrite(output_image, [pathTransformed image_file]);
 
	   xValues = zeros(34,1);
	   yValues = zeros(34,1);
	   isSymbolValues = false(34,1);
       catIndex_Values = zeros(34,1);
       output_image = imread([pathTransformed image_file]);
       extractedSymbols=0;
       [height, width, ~] = size(output_image);
       width=width-2*margin_left;
       height = height-2*margin_top;
       %round down
       segmentW= width / 11;
       segmentH= height / 8;
       

      
       segment_top;
       segment_right;
       segment_bottom;
       segment_left;
       
       fileIDX = fopen([pathData 'x_values.txt'],'w');
       fileIDY = fopen([pathData 'y_values.txt'],'w');
       fileIDCategory = fopen([pathData 'catIndex_values.txt'],'w');
       fileIDEmpty = fopen([pathData 'isSymbol_values.txt'],'w');
       for i=1:size(xValues)
           fprintf(fileIDX, [num2str(xValues(i)) '\n']);
           fprintf(fileIDY, [num2str(yValues(i)) '\n']);
           fprintf(fileIDCategory, [num2str(catIndex_Values(i)) '\n']);
           fprintf(fileIDEmpty, [log2str(isSymbolValues(i)) '\n']);
       end
       fclose(fileIDX);
       fclose(fileIDY);
       fclose(fileIDCategory);
       fclose(fileIDEmpty);
    

       timeStamp = datetime('now');
       successMessage = [datestr(timeStamp), ' ', 'success\n'];
       successFile=fopen('success.log','w');
       fprintf(successFile, successMessage);
       fclose(successFile);
       
       
catch exception
	timeStamp = datetime('now');
	errorMessage = [datestr(timeStamp) , ' ERROR: ', exception.identifier,'.  ImageId: ', image_file,' Detailed: ', exception.message, '\n',...
	'	Wrong X Values:', mat2str(X), '\n',...
	'	Wrong Y Values:', mat2str(Y), '\n'];
	errorFile=fopen('error.log','w');
	fprintf(errorFile, errorMessage);
	fclose(errorFile);
end
   
    end
end


function str=log2str(a)
    if a
        str='true';
    else
        str='false';
    end
end