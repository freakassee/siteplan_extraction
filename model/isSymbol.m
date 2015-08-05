function [bool, lengths,indexOfCategory] = isSymbol(image)
    indexOfCategory = 0;
    %figure;imshow(image);
    bool = true;
    [height, width, ~] = size(image);
    height  = height - 1;
    width   = width  - 1;
    cropped = imcrop(image, [3/8 * width, ...
                             5/12 * height, ...
                             1/4 * width, ...
                             1/5 * height]);
%     figure;imshow(cropped);
     
    gray = rgb2gray(cropped);
    [countsGray, xGray] = imhist(gray);

    [peaks, pos] = findpeaks(countsGray,xGray);

    lengths = length(peaks);

    if length(peaks) <= 5
        bool=false;

    else
        if length(peaks) < 35 && length(peaks) > 5
        
        peaksAboveTresholdPercentage = length(find(peaks > 0.01 * max(peaks)));
        [~, posOfMaxPeak] = max(peaks);
        
        peaksInRangeTreshhold = length(...
            find(peaks(...
                pos >= pos(posOfMaxPeak) - 10 & ...
                pos <= pos(posOfMaxPeak) + 10 & ...
                pos ~= pos(posOfMaxPeak)) > 0.01 * max(peaks)));
        
        treshed = peaksAboveTresholdPercentage - peaksInRangeTreshhold;
            if treshed <= 5
                bool = false;
            end
        end
    end
    if bool
        index = 1;
        RGBPoints = zeros(8,3);
        x_values = zeros(8,1);
        y_values = zeros(8,1);
        [cropped_H,cropped_W,~] = size(cropped);
        for h=1:3
            yCoordinate = ceil(cropped_H*(h/4));
            for w = 1:3
                if h ~= 2
                xCoordinate = ceil(cropped_W*(2*w-1)/6);
                x_values(index) = xCoordinate;
                y_values(index) = yCoordinate;
              
                index= index + 1 ;
                else
                    if w ~=3
                        xCoordinate = ceil(cropped_W*(2*w)/6);
                        x_values(index) = xCoordinate;
                        y_values(index) = yCoordinate;
                        RGBPoints(index,:) = cropped(yCoordinate,xCoordinate,:);
                        index= index + 1 ;
                    end
                end  
            end
        end
      indexOfCategory= checkRGBValues(RGBPoints); 
        
%        RGBPoints     
    end
end

function indexOfCategory = checkRGBValues(points)
    bool = true;
    
    isBlack = points(:,1)<80.&points(:,2)<80.&points(:,3)<80;
    nrBlack = length(isBlack(isBlack==1));
    isYellow = points(:,1)>100.&points(:,2)>100.&points(:,3)<50;
    nrYellow =length(isYellow(isYellow==1));
    isRed = points(:,1)>100.&points(:,2)<50.&points(:,3)<50;
    nrRed= length(isRed(isRed==1));
    isBlue = points(:,1)<50.&points(:,2)<50.&points(:,3)>100;
    nrBlue=length(isBlue(isBlue==1));
      
    %%indexOfCategories = cellstr(['rettung  ';'fuehrung ';'feuerwehr';'thw      ']);
    [value, indexOfCategory] = max([0,nrYellow,nrRed,nrBlue]);
    if (value + nrBlack)<4
      
       indexOfCategory = 0;
        end

end