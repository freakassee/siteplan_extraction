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
    pathTransformed = [pathFile 'transformed/'];
    
    
    mkdir(pathData);
    mkdir(pathExtracted);
    mkdir(pathTransformed);
    
catch exception
    isError = true;
	timeStamp = datetime('now');
	errorMessage = [datestr(timeStamp) , ' ERROR: ', exception.identifier,'. Detailed: ', exception.message,'\n'];
	errorFile=fopen('error.log','w');
	fprintf(errorFile, errorMessage);
	fclose(errorFile);
end

if ~isError
%load staticC.mat;
%tresh = 7;
showImage = false;
targetFolder = '../uploads/';
% % candidateImages = {'1.jpg', '2.jpg', '3.jpg', '4.jpg','5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', ...
% %         '11.jpg', '12.jpg', '13.jpg','14.jpg','15.jpg','16.jpg','17.jpg','18.jpg','19.jpg', '20.jpg','21.jpg','22.jpg'};

% static version
    

    
    
    % % everthing with % % is for the dynamic version
    % % for n = 1:length(C)
    
    
    % % 1. initiating variables and then call perspective
% %     candidateChoice = m;
    
    
    targetImageFile = strcat(targetFolder, image_file);
    input_image = imread(targetImageFile);
    
    
%     X = C{m,1};     
%     Y = C{m,2};     

% X1 = [186.25, 817.5, 807.5, 218.75];
% Y1 = [204.3750000000001, 221.8750000000001, 649.3750000000001, 708.1250000000001];

    X = X_transposed';
    Y = Y_transposed';

    [output_image, margin_left, margin_top] = make_rectangle(input_image, X,Y);
    
%     figure; imshow(transformedImage); set(gcf, 'Position', get(0, 'Screensize'));
    imwrite(output_image, [pathTransformed image_file]);
   % imwrite(output_image, [pathTransformed fileName '2.' extension]);
    
    % % 2. directly call perspective with the arguments (more elegant then 1.)
%       [output_image, margin_left, margin_top] = make_rectangle(input_image,C{n,1},C{n,2},cell2mat(C{n,3}));
    
%     ...[numberS]=
%           segment_image;%(output_image, margin_left, margin_top, showImage);
	   xValues = zeros(34,1);
	   yValues = zeros(34,1);
	   isSymbolValues = false(34,1);
       output_image = imread([pathTransformed image_file]);
       extractedSymbols=0;
       [height, width, ~] = size(output_image);
       width=width-margin_left;
       height = height-2*margin_top;
       %round down
       segmentW= floor(width / 11);
       segmentH= floor(height / 8);
       
%        width=width-margin_left;
%        height = height-margin_top;
%        segmentW= round(width / 11 - margin_left / 13);
%        segmentH= round(height / 8 - margin_top / 10);

      
       segment_top;
       segment_right;
       segment_bottom;
       segment_left;
       
       fileIDX = fopen([pathData 'x_values.txt'],'w');
       fileIDY = fopen([pathData 'y_values.txt'],'w');
       fileIDEmpty = fopen([pathData 'isSymbol_values.txt'],'w');
       for i=1:size(xValues)
           fprintf(fileIDX, [num2str(xValues(i)) '\n']);
           fprintf(fileIDY, [num2str(yValues(i)) '\n']);
           fprintf(fileIDEmpty, [log2str(isSymbolValues(i)) '\n']);
       end
       fclose(fileIDX);
       fclose(fileIDY);
       fclose(fileIDEmpty);
    
    %bool= numberS == numberOfTSymbols
    % toc;
       timeStamp = datetime('now');
       successMessage = [datestr(timeStamp), ' ', 'success\n'];
       successFile=fopen('success.log','w');
       fprintf(successFile, successMessage);
       fclose(successFile);
    end
end


function str=log2str(a)
    if a
        str='true';
    else
        str='false';
    end
end